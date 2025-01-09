import { IStripePaymentIntent } from "../interfaces/models/stripe-payment-intent.interface";
import StripePaymentIntent from "../models/stripe-payment-intent.model";
import Repository from "./Repository";

export default class StripePaymentIntentRepository extends Repository<IStripePaymentIntent> {

    /**
     * Constructor for StripePaymentIntentRepository
     * 
     * Sets the model to StripePaymentIntent
     */
    constructor() {
        super(StripePaymentIntent);
    }

   
}