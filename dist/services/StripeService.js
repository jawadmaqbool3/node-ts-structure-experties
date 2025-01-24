"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const currency_constant_1 = require("../constants/currency.constant");
const env_constant_1 = require("../constants/env.constant");
const StripeCustomerRepository_1 = __importDefault(require("../repositories/StripeCustomerRepository"));
const StripePaymentIntentRepository_1 = __importDefault(require("../repositories/StripePaymentIntentRepository"));
const mongoos_utils_1 = require("../utils/mongoos.utils");
const Service_1 = __importDefault(require("./Service"));
const stripe_1 = __importDefault(require("stripe"));
class StripeService extends Service_1.default {
    /**
     * Constructor
     *
     * @param {StripeCustomerRepository} stripeCustomerRepository - customer repository
     * @param {StripePaymentIntentRepository} stripePaymentIntentRepository - payment intent repository
     *
     * @throws {StripeCredentialsNotFoundException} - if stripe secret key is not set
     */
    constructor(stripeCustomerRepository = new StripeCustomerRepository_1.default(), stripePaymentIntentRepository = new StripePaymentIntentRepository_1.default()) {
        super();
        this.stripeCustomerRepository = stripeCustomerRepository;
        this.stripePaymentIntentRepository = stripePaymentIntentRepository;
        this.stripe = new stripe_1.default(env_constant_1.STRIPE_SECRET_KEY);
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
    createPaymentIntent(intentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, orderId, customer } = intentRequest;
            const stripeCustomer = yield this.getOrCreateStripeCustomer(customer);
            const paymentIntent = yield this.stripe.paymentIntents.create({
                amount: amount * currency_constant_1.CENTS_TO_DOLLARS_MULTIPLIER,
                currency: currency_constant_1.USD,
                customer: stripeCustomer.stripe_id,
                metadata: { orderId: orderId.toString() },
            });
            return yield this.stripePaymentIntentRepository.create({
                order_id: (0, mongoos_utils_1.toObjectId)(orderId),
                amount,
                currency: currency_constant_1.USD,
                intent_id: paymentIntent.id,
                stripe_id: stripeCustomer.stripe_id
            });
        });
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
    getOrCreateStripeCustomer(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, name }) {
            const existingRecord = yield this.stripeCustomerRepository.searchByEmail(email);
            if (existingRecord)
                return existingRecord;
            const stripeCustomer = yield this.stripe.customers.create({
                email,
                name,
            });
            const createdRecord = yield this.stripeCustomerRepository.create({
                email,
                name,
                stripe_id: stripeCustomer.id,
            });
            return createdRecord;
        });
    }
}
exports.default = StripeService;
