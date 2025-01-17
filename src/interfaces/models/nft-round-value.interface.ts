import mongoose, { Document } from "mongoose";

export interface INftRoundValueBase  {
    retail_price: number;
    retail_quantity_total: number;
    retail_quantity_sold: number;
    trunk_quantity_total: number;
    trunk_quantity_sold: number;
    fast_discount_quantity_total: number;
    fast_discount_quantity_sold: number;
    trunk_discount_percentage: number;
    fast_discount_percentage: number;
    round_id: mongoose.Types.ObjectId;
    nft_id: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface INftRoundValue extends Document, INftRoundValueBase {
    _id: mongoose.Types.ObjectId;
}
export interface INftRoundValueLean extends INftRoundValueBase {
    _id: mongoose.Types.ObjectId;
}

