import Service from "./Service";

import { TPlaceOrderRequestParams } from "../types/nft-order.type";

import NftRoundValueRepository from "../repositories/NftRoundValueRepository";
import FirstRoundLandingRepository from "../repositories/FirstRoundLandingRepository";
import TrunkHolderRepository from "../repositories/TrunkHolderRepository";
import NftOrderRepository from "../repositories/NftOrderRepository";
import NftRoundRepository from "../repositories/NftRoundRepository";

import { toObjectId } from "../utils/mongoos.utils";
import { calculateDurationTillNowInSeconds } from "../utils/time";

import { IFirstRoundLandingWithRound } from "../interfaces/models/first-round-landing.interface";
import { INftOrder, INftOrderBase } from "../interfaces/models/nft-order.interface";
import { INftRound } from "../interfaces/models/nft-round.interface";
import { INftRoundValue } from "../interfaces/models/nft-round-value.interface";
import mongoose from "mongoose";
import {
    calculateValidatedDiscountAmounts,
    ensureRoundIsActive,
    isFastDiscountApplicable,
    validateAvailableQuantity
} from "../utils/nft-order.utils";
import RoundNotFoundException from "../exceptions/nft-round/RoundNotFoundException";
import FirstRoundLandingNotFoundException from "../exceptions/first-round-landing/FirstRoundLandingNotFoundException";

export default class NftOrderService extends Service {

    /**
     * Constructor
     *
     * @param {NftRoundValueRepository} nftRoundValuesRepository - nft round value repository
     * @param {FirstRoundLandingRepository} firstLandingRepository - first round landing repository
     * @param {NftRoundRepository} nftRoundRepository - nft round repository
     * @param {TrunkHolderRepository} trunkHolderRepository - trunk holder repository
     * @param {NftOrderRepository} nftOrderRepository - nft order repository
     * 
     * @constructor
     */
    constructor(
        private nftRoundValuesRepository = new NftRoundValueRepository(),
        private firstLandingRepository = new FirstRoundLandingRepository(),
        private nftRoundRepository = new NftRoundRepository(),
        private trunkHolderRepository = new TrunkHolderRepository(),
        private nftOrderRepository = new NftOrderRepository(),
    ) {
        super();
    }

/**
 * Places an NFT order with the given parameters after validating quantities,
 * calculating applicable discounts, and ensuring the round is active.
 * 
 * @param {TPlaceOrderRequestParams} params - The parameters required to place an order, including
 * purchase wallet, round values ID, units, total price, etc.
 * 
 * @returns {Promise<INftOrder>} - A promise that resolves to the created NFT order.
 * 
 * @throws {RoundNotFoundException} - If the specified round cannot be found.
 * @throws {FirstRoundLandingNotFoundException} - If the first round landing cannot be retrieved.
 * @throws {NotEnoughQuantityAvailableException} - If the required quantity is not available.
 * @throws {OrderAmountValidationFailedException} - If the calculated order amount is invalid.
 */
    public async placeOrder(params: TPlaceOrderRequestParams): Promise<INftOrder> {

        const roundValue = await this.getRoundValues(params.round_values_id);
        const firstRoundLanding = await this.getFirstRoundLanding(params.ip, roundValue.round_id);
        const round = await this.getRound(roundValue.round_id);

        const timeConsumed: number = calculateDurationTillNowInSeconds(firstRoundLanding.createdAt || new Date());

        ensureRoundIsActive(timeConsumed, round.duration_days);

        let isDiscountApplicable: boolean = isFastDiscountApplicable(
            timeConsumed,
            firstRoundLanding.round.fast_discount_duration_hours
        );
        const isTrunkHolder: boolean = await this.trunkHolderRepository.isTrunkHolder(params.purchase_wallet);

        const {
            applicableFastDiscountUnits,
            applicableTrunkDiscountUnits,
            applicableRetailUnits
        } = validateAvailableQuantity(
            roundValue,
            params.units,
            isDiscountApplicable,
            isTrunkHolder
        );

        const {
            trunkHolderDiscountAmount,
            fastDiscountAmount
        } = calculateValidatedDiscountAmounts(
            roundValue,
            params.units,
            applicableTrunkDiscountUnits,
            applicableFastDiscountUnits
        )

        await this.nftRoundValuesRepository.decrementUnits(
            roundValue._id,
            {
                applicableTrunkDiscountUnits,
                applicableFastDiscountUnits,
                applicableRetailUnits
            }
        );

        return this.nftOrderRepository.create({
            purchase_wallet: params.purchase_wallet,
            round_values_id: toObjectId(params.round_values_id),
            round_id: params.round_id,
            nft_id: params.nft_id,
            total_price: params.total_price,
            trunk_units_consumed: applicableTrunkDiscountUnits,
            fast_units_consumed: applicableFastDiscountUnits,
            retail_units_consumed: applicableRetailUnits,
            trunk_discount_amount: trunkHolderDiscountAmount,
            fast_discount_amount: fastDiscountAmount,
            units: params.units,
        } as Partial<INftOrderBase>);
    }

        /**
         * Finds a RoundValue by its id. If it doesn't exist, throws a RoundNotFoundException.
         * @param round_values_id id of the RoundValue to find
         * @returns the found RoundValue
         * @throws RoundNotFoundException if the RoundValue is not found
         */
    private async getRoundValues(round_values_id: string): Promise<INftRoundValue> {
        const roundValue: INftRoundValue | null = await this.nftRoundValuesRepository.findById(round_values_id);
        if (!roundValue) throw new RoundNotFoundException();
        return roundValue;
    }

        /**
         * Finds a FirstRoundLanding with its associated Round by the given ip and round_id. If it doesn't exist, throws a FirstRoundLandingNotFoundException.
         * @param ip ip address of the user
         * @param round_id id of the Round to find the FirstRoundLanding for
         * @returns the found FirstRoundLanding with its associated Round
         * @throws FirstRoundLandingNotFoundException if the FirstRoundLanding is not found
         */
    private async getFirstRoundLanding(ip: string, round_id: mongoose.Schema.Types.ObjectId): Promise<IFirstRoundLandingWithRound> {
        const firstRoundLanding: IFirstRoundLandingWithRound | null = await this.firstLandingRepository.findOneWithRound({ ip, round_id });
        if (!firstRoundLanding) throw new FirstRoundLandingNotFoundException();
        return firstRoundLanding;
    }

        /**
         * Finds a Round by its id. If it doesn't exist, throws a RoundNotFoundException.
         * @param round_id id of the Round to find
         * @returns the found Round
         * @throws RoundNotFoundException if the Round is not found
         */
    private async getRound(round_id: mongoose.Schema.Types.ObjectId): Promise<INftRound> {
        const round: INftRound | null = await this.nftRoundRepository.findById(round_id);
        if (!round) throw new RoundNotFoundException();
        return round;
    }

}
