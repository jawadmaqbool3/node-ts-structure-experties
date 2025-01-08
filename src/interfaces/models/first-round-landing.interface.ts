import mongoose, { Document } from "mongoose";
import { INftRound } from "./nft-round.interface";

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
    _id: mongoose.Schema.Types.ObjectId;
}

export interface IFirstRoundLandingWithRound extends IFirstRoundLandingLean {
    round: INftRound;
}