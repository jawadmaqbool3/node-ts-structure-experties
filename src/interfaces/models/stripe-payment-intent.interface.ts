import mongoose, { Document } from "mongoose";
import { PaymentIntentStatus } from "../../enums/stripe.enum";

export interface IStripePaymentIntentBase {
    order_id: mongoose.Schema.Types.ObjectId,
    amount: number,
    currency: string,
    status: PaymentIntentStatus,
    intent_id: string,
    stripe_id: string,
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IStripePaymentIntent extends IStripePaymentIntentBase, Document {
    _id: mongoose.Schema.Types.ObjectId;
}

export interface IStripePaymentIntentLean extends IStripePaymentIntentBase {
    _id: mongoose.Schema.Types.ObjectId;
}


