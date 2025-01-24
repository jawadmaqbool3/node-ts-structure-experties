"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_customer_model_1 = __importDefault(require("../database/models/stripe-customer.model"));
const Repository_1 = __importDefault(require("./Repository"));
class StripeCustomerRepository extends Repository_1.default {
    /**
     * Constructs an instance of StripeCustomerRepository using the StripeCustomer model.
     */
    constructor() {
        super(stripe_customer_model_1.default);
    }
    /**
     * Searches for a stripe customer by their email address in a case-insensitive manner.
     *
     * @param {string} email The email address to search for.
     *
     * @returns {Promise<IStripeCustomer | null>} - A promise that resolves to the found stripe customer or null if no customer matches the email address.
     */
    searchByEmail(email) {
        return this.model.findOne({ "email": { "$regex": email, "$options": "i" } });
    }
}
exports.default = StripeCustomerRepository;
