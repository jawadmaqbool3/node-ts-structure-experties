import Service from "./Service";

import { TPlaceOrderRequestParams } from "../types/place-order.type";

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
import { INftRoundValue, INftRoundValueLean } from "../interfaces/models/nft-round-value.interface";
import mongoose from "mongoose";
import { calculateValidatedDiscountAmounts, ensureRoundIsActive, isFastDiscountApplicable, validateAvailableQuantity } from "../utils/nft-order.utils";

export default class NftOrderService extends Service {

    constructor(
        private nftRoundValuesRepository = new NftRoundValueRepository(),
        private firstLandingRepository = new FirstRoundLandingRepository(),
        private nftRoundRepository = new NftRoundRepository(),
        private trunkHolderRepository = new TrunkHolderRepository(),
        private nftOrderRepository = new NftOrderRepository(),
    ) {
        super();
    }

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

    private async getRoundValues(round_values_id: string): Promise<INftRoundValue> {
        const roundValue: INftRoundValue | null = await this.nftRoundValuesRepository.findById(round_values_id);
        if (!roundValue) throw new Error('Round value not found');
        return roundValue;
    }

    private async getFirstRoundLanding(ip: string, round_id: mongoose.Schema.Types.ObjectId): Promise<IFirstRoundLandingWithRound> {
        const firstRoundLanding: IFirstRoundLandingWithRound | null = await this.firstLandingRepository.findOneWithRound({ ip, round_id });
        if (!firstRoundLanding) throw new Error('First round landing not found');
        return firstRoundLanding;
    }

    private async getRound(round_id: mongoose.Schema.Types.ObjectId): Promise<INftRound> {
        const round: INftRound | null = await this.nftRoundRepository.findById(round_id);
        if (!round) throw new Error('Round not found');
        return round;
    }

}
