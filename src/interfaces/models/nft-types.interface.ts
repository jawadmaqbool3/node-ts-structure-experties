import mongoose, { Document } from "mongoose";
import { INft, INftLean } from "./nft.interface";

export interface INftTypeBase  {
    name: string,
    createdAt?: Date; 
    updatedAt?: Date;
}


export interface INftType extends INftTypeBase, Document {
    _id: mongoose.Types.ObjectId;
}

export interface INftTypeLean extends INftTypeBase {
    _id:  mongoose.Types.ObjectId;
}


export interface INftTypeExtendedForInitialSalesPage extends INftTypeLean {
    latestRound?: any;
    activeRound?: any;
    consumedTime?: number
    nfts?: INftLean[];
}

