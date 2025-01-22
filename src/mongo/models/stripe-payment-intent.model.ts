import mongoose, { Model } from 'mongoose';

import { PaymentIntentStatus } from '../../enums/stripe.enum';
import { IStripePaymentIntent } from '../../interfaces/models/stripe-payment-intent.interface';
import { USD } from '../../constants/currency.constant';

const StripePaymentIntentSchema = new mongoose.Schema<IStripePaymentIntent>({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "transactions", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: USD },
    status: { type: String, enum: PaymentIntentStatus, default: PaymentIntentStatus.PENDING },
    intent_id: { type: String, required: true },
    stripe_id: { type: String, required: true }
}, { timestamps: true });

const StripePaymentIntent: Model<IStripePaymentIntent> = mongoose.model<IStripePaymentIntent>('stripe_payment_intents', StripePaymentIntentSchema);



export default StripePaymentIntent;
