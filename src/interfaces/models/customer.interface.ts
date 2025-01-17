import mongoose, { Document } from "mongoose";

export interface ICustomerBase {
    first_name: string;
    last_name: string | undefined | null;
    wallet_address: string;
    sol_wallet_address: string;
    password: string;
    remember_token: string;
    status: boolean;
    email: string;
    grand_parent_id: mongoose.Types.ObjectId | null;
    parent_id: mongoose.Types.ObjectId | null;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface ICustomer extends ICustomerBase, Document {
    _id: mongoose.Types.ObjectId;
}

export interface ICustomerLean extends ICustomerBase {
    _id: mongoose.Types.ObjectId;
}



