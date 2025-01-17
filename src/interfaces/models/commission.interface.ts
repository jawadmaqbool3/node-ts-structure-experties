import mongoose, { Document } from "mongoose";
import { CommissionType } from "../../enums/commission.enum";
import { NetworkType } from "../../enums/transaction.enum";

export interface ICommissionBase  {
    comission_to: string | mongoose.Types.ObjectId;
    transaction_by: string | mongoose.Types.ObjectId;
    transaction_id: string | mongoose.Types.ObjectId;
    transaction_network: NetworkType;
    comission_token: number;
    commission_status: boolean;
    commission_percentage: number;
    type: CommissionType; 
    createdAt?: Date; 
    updatedAt?: Date;
}


export interface ICommission extends ICommissionBase, Document {
    _id: mongoose.Types.ObjectId;
}

export interface ICommissionLean extends ICommissionBase {
    _id: mongoose.Types.ObjectId;
}


