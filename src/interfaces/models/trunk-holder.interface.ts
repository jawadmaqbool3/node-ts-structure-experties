import mongoose, { Document } from "mongoose";

export interface ITrunkHolderBase  {
    wallet_address: string;
    createdAt?: Date; 
    updatedAt?: Date;
}


export interface ITrunkHolder extends ITrunkHolderBase, Document {
    _id: mongoose.Types.ObjectId;
}

export interface ITrunkHolderLean extends ITrunkHolderBase {
    _id: mongoose.Types.ObjectId;
}


