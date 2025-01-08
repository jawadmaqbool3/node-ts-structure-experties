import mongoose, { Document } from "mongoose";

export interface INftRoundBase  {
    name: string,
    nft_type_id: mongoose.Schema.Types.ObjectId,
    duration_days: number,
    fast_discount_duration_hours: number,
    createdAt?: Date;
    updatedAt?: Date;
}
export interface INftRound extends Document, INftRoundBase {
    _id: mongoose.Schema.Types.ObjectId;
}
export interface INftRoundLean extends INftRoundBase {
    _id: mongoose.Schema.Types.ObjectId;
}

