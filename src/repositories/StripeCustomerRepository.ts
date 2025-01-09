import { IStripeCustomer } from "../interfaces/models/stripe-customer.interface";
import StripeCustomer from "../models/stripe-customer.model";
import Repository from "./Repository";

export default class StripeCustomerRepository extends Repository<IStripeCustomer> {
  
/**
 * Constructs an instance of StripeCustomerRepository using the StripeCustomer model.
 */

    constructor() {
        super(StripeCustomer);
    }


    searchByEmail(email: string) {
        return this.model.findOne({ "email": { "$regex": email, "$options": "i" } });
    }

   
}