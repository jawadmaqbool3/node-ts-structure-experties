import mongoose, { Document } from "mongoose";

export interface INftOrderBase {
    purchase_wallet: string,
    target_wallet: string,
    encrypted_target_wallet: string
    round_values_id: mongoose.Types.ObjectId
    round_id: mongoose.Types.ObjectId,
    nft_id: mongoose.Types.ObjectId,
    total_price: number,
    trunk_units_consumed: number,
    fast_units_consumed: number,
    retail_units_consumed: number,
    trunk_discount_amount: number,
    fast_discount_amount: number,
    units: number,
    status: string,
    createdAt?: Date;
    updatedAt?: Date;
}


export interface INftOrder extends INftOrderBase, Document {
    _id: mongoose.Types.ObjectId;
}

export interface INftOrderLean extends INftOrderBase {
    _id: mongoose.Types.ObjectId;
}



