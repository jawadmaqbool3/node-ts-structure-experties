import mongoose, { mongo } from "mongoose";
import { INftRoundValue } from "../interfaces/models/nft-round-value.interface";
import NftRoundValue from "../models/nft-round-value.model";
import Repository from "./Repository";
import { TNftApplicableDiscountQuantity } from "../types/nft-order.type";
import { toObjectId } from "../utils/mongoos.utils";
import RoundValuesNotFoundException from "../exceptions/round-values/RoundValuesNotFoundException";

export default class NftRoundValueRepository extends Repository<INftRoundValue> {
    /**
     * Initializes a new instance of the NftRoundValueRepository class.
     * Calls the superclass constructor with the NftRoundValue model.
     */
    constructor() {
        super(NftRoundValue);
    }


    /**
     * Decrements the trunk, fast discount and retail quantity sold from the RoundValue with the given id
     * by the given applicable units. Returns the updated RoundValue.
     * @param round_values_id id of the RoundValue to update
     * @param units object with applicableTrunkDiscountUnits, applicableFastDiscountUnits and applicableRetailUnits
     * @returns the updated RoundValue, or null if the RoundValue was not found
     */
    public decrementUnits(
        round_values_id: mongoose.Schema.Types.ObjectId,
        units: TNftApplicableDiscountQuantity,

    ): Promise<INftRoundValue | null> {
        const {
            applicableFastDiscountUnits,
            applicableTrunkDiscountUnits,
            applicableRetailUnits
        } = units;
        return this.model.findOneAndUpdate(
            { _id: round_values_id },
            {
                $inc: {
                    trunk_quantity_sold: -applicableTrunkDiscountUnits,
                    fast_discount_quantity_sold: -applicableFastDiscountUnits,
                    retail_quantity_sold: -applicableRetailUnits
                }
            },
            { new: true }
        ).exec();
    }


    /**
     * Finds a RoundValue by its id. If it doesn't exist, throws a RoundValuesNotFoundException.
     * @param round_values_id id of the RoundValue to find
     * @returns the found RoundValue
     * @throws RoundValuesNotFoundException if the RoundValue is not found
     */
    public async getValidated(round_values_id: string | mongoose.Schema.Types.ObjectId): Promise<INftRoundValue> {
        const roundValues: INftRoundValue | null = await this.findById(round_values_id);
        if (!roundValues) throw new RoundValuesNotFoundException();
        return roundValues;
    }


}