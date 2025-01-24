"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const stripe_enum_1 = require("../../enums/stripe.enum");
const currency_constant_1 = require("../../constants/currency.constant");
const StripePaymentIntentSchema = new mongoose_1.default.Schema({
    order_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "transactions", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: currency_constant_1.USD },
    status: { type: String, enum: stripe_enum_1.PaymentIntentStatus, default: stripe_enum_1.PaymentIntentStatus.PENDING },
    intent_id: { type: String, required: true },
    stripe_id: { type: String, required: true }
}, { timestamps: true });
const StripePaymentIntent = mongoose_1.default.model('stripe_payment_intents', StripePaymentIntentSchema);
exports.default = StripePaymentIntent;
