import mongoose, { Document } from "mongoose";
import { INftRoundValueLean } from "./nft-round-value.interface";

export interface INftBase  {
    name: string,
    booths: number,
    nft_type_id: mongoose.Schema.Types.ObjectId,
    createdAt?: Date; 
    updatedAt?: Date;
}


export interface INft extends INftBase, Document {
    _id: mongoose.Schema.Types.ObjectId;
}

export interface INftLean extends INftBase {
    _id: mongoose.Schema.Types.ObjectId;
}



export interface INftExtendedForInitialSalesPage extends INftLean {
    roundValue: INftRoundValueLean | null | undefined
}