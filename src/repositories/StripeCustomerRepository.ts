import { IStripeCustomer } from "../interfaces/models/stripe-customer.interface";
import StripeCustomer from "../mongo/models/stripe-customer.model";
import Repository from "./Repository";

export default class StripeCustomerRepository extends Repository<IStripeCustomer> {

    /**
     * Constructs an instance of StripeCustomerRepository using the StripeCustomer model.
     */

    constructor() {
        super(StripeCustomer);
    }


    /**
     * Searches for a stripe customer by their email address in a case-insensitive manner.
     *
     * @param {string} email The email address to search for.
     * 
     * @returns {Promise<IStripeCustomer | null>} - A promise that resolves to the found stripe customer or null if no customer matches the email address.
     */
    searchByEmail(email: string) {
        return this.model.findOne({ "email": { "$regex": email, "$options": "i" } });
    }


}