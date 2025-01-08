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
    round_id: mongoose.Schema.Types.ObjectId;
    nft_id: mongoose.Schema.Types.ObjectId;
    fast_discount_duration_hours: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface INftRoundValue extends Document, INftRoundValueBase {
    _id: mongoose.Schema.Types.ObjectId;
}
export interface INftRoundValueLean extends INftRoundValueBase {
    _id: mongoose.Schema.Types.ObjectId;
}

