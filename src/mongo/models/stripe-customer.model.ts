import mongoose, { Model } from 'mongoose';

import { IStripeCustomer } from '../../interfaces/models/stripe-customer.interface';


const stripeCustomer = new mongoose.Schema<IStripeCustomer>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    stripe_id: { type: String, required: true },
}, { timestamps: true });

const StripeCustomer: Model<IStripeCustomer> = mongoose.model<IStripeCustomer>('stripe_customers', stripeCustomer);



export default StripeCustomer;
