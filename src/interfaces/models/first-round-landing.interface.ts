import mongoose, { Document } from "mongoose";

export interface IFirstRoundLandingBase {
    ip: string;
    round_id: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IFirstRoundLanding extends IFirstRoundLandingBase, Document {
    _id: mongoose.Schema.Types.ObjectId;
}

export interface IFirstRoundLandingLean extends IFirstRoundLandingBase {
    _id: string;
}