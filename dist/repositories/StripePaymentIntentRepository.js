"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_payment_intent_model_1 = __importDefault(require("../database/models/stripe-payment-intent.model"));
const Repository_1 = __importDefault(require("./Repository"));
class StripePaymentIntentRepository extends Repository_1.default {
    /**
     * Constructor for StripePaymentIntentRepository
     *
     * Sets the model to StripePaymentIntent
     */
    constructor() {
        super(stripe_payment_intent_model_1.default);
    }
}
exports.default = StripePaymentIntentRepository;
