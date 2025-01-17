import mongoose, { Document } from "mongoose";

export interface IStripeCustomerBase  {
    email: string;
    name: string;
    stripe_id: string;
    createdAt?: Date; 
    updatedAt?: Date;
}


export interface IStripeCustomer extends IStripeCustomerBase, Document {
    _id: mongoose.Types.ObjectId;
}

export interface IStripeCustomerLean extends IStripeCustomerBase {
    _id: mongoose.Types.ObjectId;
}


