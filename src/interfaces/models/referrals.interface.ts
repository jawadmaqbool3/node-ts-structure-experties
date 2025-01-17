import mongoose, { Document } from "mongoose";

export interface IReferralBase {
    number_of_uses: number;
    referral_id: string;
    user_id: mongoose.Types.ObjectId;
    referral_count: number;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IReferral extends IReferralBase, Document {
    _id: mongoose.Types.ObjectId;
}

export interface IReferralLean extends IReferralBase {
    _id: mongoose.Types.ObjectId;
}



