import mongoose from "mongoose";


export type TStripeCustomer = {
    id?: string | mongoose.Schema.Types.ObjectId,
    email: string,
    name: string
}
export type TPaymentIntentCreateRequest = {
    amount: number,
    orderId: string | mongoose.Schema.Types.ObjectId,
    customer: TStripeCustomer
}