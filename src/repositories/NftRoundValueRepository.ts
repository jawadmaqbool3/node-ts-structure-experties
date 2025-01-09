import mongoose, { mongo } from "mongoose";
import { INftRoundValue } from "../interfaces/models/nft-round-value.interface";
import NftRoundValue from "../models/nft-round-value.model";
import Repository from "./Repository";
import { TNftApplicableDiscountQuantity } from "../types/place-order.type";

export default class NftRoundValueRepository extends Repository<INftRoundValue> {
    constructor() {
        super(NftRoundValue);
    }


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



}