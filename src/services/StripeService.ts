import { CENTS_TO_DOLLARS_MULTIPLIER, USD } from "../constants/currency.constant";
import StripeCredentialsNotFoundException from "../exceptions/StripeCredentialsNotFoundException";
import { IStripeCustomer } from "../interfaces/models/stripe-customer.interface";
import { IStripePaymentIntent } from "../interfaces/models/stripe-payment-intent.interface";
import StripeCustomerRepository from "../repositories/StripeCustomerRepository";
import StripePaymentIntentRepository from "../repositories/StripePaymentIntentRepository";
import { TPaymentIntentCreateRequest, TStripeCustomer } from "../types/stripe.type";
import { toObjectId } from "../utils/mongoos.utils";
import Service from "./Service";
import Stripe from 'stripe';


export default class StripeService extends Service {
    private stripe: Stripe;
    /**
     * Constructor
     *
     * @param {StripeCustomerRepository} stripeCustomerRepository - customer repository
     * @param {StripePaymentIntentRepository} stripePaymentIntentRepository - payment intent repository
     *
     * @throws {StripeCredentialsNotFoundException} - if stripe secret key is not set
     */
    constructor(
        private stripeCustomerRepository = new StripeCustomerRepository(),
        private stripePaymentIntentRepository = new StripePaymentIntentRepository(),
    ) {
        super();
        if (!process.env.STRIPE_SECRET_KEY) throw new StripeCredentialsNotFoundException();
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    }

    /**
     * Creates a stripe payment intent
     *
     * @param {TPaymentIntentCreateRequest} intentRequest - request to create a payment intent
     *
     * @returns {Promise<IStripePaymentIntent>} - created payment intent
     *
     * @throws {StripeCredentialsNotFoundException} - if stripe secret key is not set
     * @throws {StripeError} - if stripe fails to create a payment intent
     */
    public async createPaymentIntent(intentRequest: TPaymentIntentCreateRequest): Promise<IStripePaymentIntent> {
        const {
            amount,
            orderId,
            customer
        } = intentRequest;

        const stripeCustomer = await this.getOrCreateStripeCustomer(customer);

        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * CENTS_TO_DOLLARS_MULTIPLIER,
            currency: USD,
            customer: stripeCustomer.stripe_id,
            metadata: { orderId: orderId.toString() },
        });

        return await this.stripePaymentIntentRepository.create({
            order_id: toObjectId(orderId),
            amount,
            currency: USD,
            intent_id: paymentIntent.id,
            stripe_id: stripeCustomer.stripe_id
        })
    }


    /**
     * Retrieves a stripe customer from the database by email or creates a new one
     *
     * @param {TStripeCustomer} customer - customer object with email and name
     *
     * @returns {Promise<IStripeCustomer>} - stripe customer
     *
     * @throws {StripeError} - if stripe fails to create a customer
     */
    public async getOrCreateStripeCustomer({ email, name }: TStripeCustomer): Promise<IStripeCustomer> {
        const existingRecord = await this.stripeCustomerRepository.searchByEmail(email);

        if (existingRecord) return existingRecord;

        const stripeCustomer = await this.stripe.customers.create({
            email,
            name,
        });

        const createdRecord = await this.stripeCustomerRepository.create({
            email,
            name,
            stripe_id: stripeCustomer.id,
        });

        return createdRecord;

    }
}