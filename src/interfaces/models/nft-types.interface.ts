import mongoose, { Document } from "mongoose";

export interface INftTypeBase  {
    name: { type: String, required: [true] },
    createdAt?: Date; 
    updatedAt?: Date;
}


export interface INftType extends INftTypeBase, Document {
    _id: mongoose.Schema.Types.ObjectId;
}

export interface INftTypeLean extends INftTypeBase {
    _id: string
}


export interface INftTypeExtendedForInitialSalesPage extends INftTypeBase {
    latestRound?: any;
    activeRound?: any;
    consumedTime?: number
    nfts?: any;
}

