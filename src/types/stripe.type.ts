import mongoose from "mongoose";


export type TStripeCustomer = {
    id?: string | mongoose.Types.ObjectId,
    email: string,
    name: string
}
export type TPaymentIntentCreateRequest = {
    amount: number,
    orderId: string | mongoose.Types.ObjectId,
    customer: TStripeCustomer
}