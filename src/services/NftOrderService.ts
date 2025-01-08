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
import { SECONDS_IN_DAY, SECONDS_IN_HOUR } from "../constants/time.constant";

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

    public async getRoundValues(round_values_id: string): Promise<INftRoundValue> {
        const roundValue: INftRoundValue | null = await this.nftRoundValuesRepository.findById(round_values_id);
        if (!roundValue) throw new Error('Round value not found');
        return roundValue;
    }

    public async getFirstRoundLanding(ip: string, round_id: mongoose.Schema.Types.ObjectId): Promise<IFirstRoundLandingWithRound> {
        const firstRoundLanding: IFirstRoundLandingWithRound | null = await this.firstLandingRepository.findOneWithRound({ ip, round_id });
        if (!firstRoundLanding) throw new Error('First round landing not found');
        return firstRoundLanding;
    }

    public async getRound(round_id: mongoose.Schema.Types.ObjectId): Promise<INftRound> {
        const round: INftRound | null = await this.nftRoundRepository.findById(round_id);
        if (!round) throw new Error('Round not found');
        return round;
    }

    private ensureRoundIsActive(timeConsumed: number, durationDays: number): void {
        const roundDuration = durationDays * SECONDS_IN_DAY;
        if (timeConsumed > roundDuration) throw new Error("Round has ended");
    }

    private isFastDiscountApplicable(timeConsumed: number, fastDiscountDurationHours: number): boolean {
        return timeConsumed < fastDiscountDurationHours * SECONDS_IN_HOUR;
    }

    public async placeOrder(params: TPlaceOrderRequestParams): Promise<INftOrder> {

        const roundValue = await this.getRoundValues(params.round_values_id);

        const firstRoundLanding = await this.getFirstRoundLanding(params.ip, roundValue.round_id);

        const round = await this.getRound(roundValue.round_id);

        const timeConsumed: number = calculateDurationTillNowInSeconds(firstRoundLanding.createdAt || new Date());

        this.ensureRoundIsActive(timeConsumed, round.duration_days);

        let isDiscountApplicable: boolean = this.isFastDiscountApplicable(
            timeConsumed,
            firstRoundLanding.round.fast_discount_duration_hours
        );

        const isTrunkHolder: boolean = await this.trunkHolderRepository.isTrunkHolder(params.purchase_wallet);

        const availableTrunkHoldersQuantity: number = roundValue.trunk_quantity_total - roundValue.trunk_quantity_sold;

        const availableFastQuantity: number = roundValue.fast_discount_quantity_total - roundValue.fast_discount_quantity_sold;

        const availableRetailQuantity: number = roundValue.retail_quantity_total - roundValue.retail_quantity_sold;

        if ((availableFastQuantity + availableRetailQuantity) < params.units) {

            throw new Error("Not enough quantity available");
        }

        let applicableFastDiscountUnits: number = 0;

        let applicableTrunkDiscountUnits: number = 0;


        if (isDiscountApplicable) {
            if (availableFastQuantity > params.units) {

                applicableFastDiscountUnits = params.units;
            }
            else {

                applicableFastDiscountUnits = availableFastQuantity;
            }
        }


        if (isTrunkHolder) {

            if (availableTrunkHoldersQuantity > params.units) {

                applicableTrunkDiscountUnits = params.units;
            }
            else {

                applicableTrunkDiscountUnits = availableTrunkHoldersQuantity;
            }
        }


        const netAmount: number = roundValue.retail_price * params.units;

        const fastDiscountAmountPerUnit: number = (roundValue.retail_price / 100) * roundValue.fast_discount_percentage

        const trunkDiscountAmountPerUnit: number = ((netAmount - fastDiscountAmountPerUnit) / 100) * roundValue.trunk_discount_percentage

        const applicableRetailUnits: number = params.units - applicableFastDiscountUnits;

        const trunkHolderDiscount: number = trunkDiscountAmountPerUnit * applicableTrunkDiscountUnits;

        const fastDiscount: number = fastDiscountAmountPerUnit * applicableFastDiscountUnits;

        const totalAmount: number = netAmount - (trunkHolderDiscount + fastDiscount);

        if (totalAmount != params.total_price) {
            throw new Error("Order validation failed");
        }

        await this.nftRoundValuesRepository.update(roundValue._id, {
            trunk_quantity_sold: roundValue.trunk_quantity_sold,
            fast_discount_quantity_sold: roundValue.fast_discount_quantity_sold,
            retail_quantity_sold: roundValue.retail_quantity_sold
        } as Partial<INftRoundValueLean>);

        return this.nftOrderRepository.create({
            purchase_wallet: params.purchase_wallet,
            round_values_id: toObjectId(params.round_values_id),
            round_id: params.round_id,
            nft_id: params.nft_id,
            total_price: params.total_price,
            trunk_units_consumed: applicableTrunkDiscountUnits,
            fast_units_consumed: applicableFastDiscountUnits,
            retail_units_consumed: applicableRetailUnits,
            trunk_discount_amount: trunkHolderDiscount,
            fast_discount_amount: fastDiscount,
            units: params.units,
        } as Partial<INftOrderBase>);
    }




}