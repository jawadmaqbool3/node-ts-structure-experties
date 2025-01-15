import mongoose from "mongoose";
import { toObjectId } from "../utils/mongoos.utils";
import Repository from "./Repository";
import { ICustomer } from "../interfaces/models/customer.interface";
import Customer from "../models/customer.model";
import CustomerNotFoundException from "../exceptions/customer/CustomerNotFoundException";

export default class CustomerRepository extends Repository<ICustomer> {
    /**
     * Constructor for CustomerRepository
     *
     * @constructor
     */
    constructor() {
        super(Customer);
    }

    /**
     * Validates whether a customer exists in the database.
     *
     * @param _id The MongoDB ObjectId or string _id of the customer to validate.
     * @throws CustomerNotFoundException if the customer does not exist.
     */
    public async validate(_id: string | mongoose.Schema.Types.ObjectId): Promise<void> {
        const customer: boolean | null = await this.isExists({ _id: toObjectId(_id) });
        if (!customer) throw new CustomerNotFoundException();
    }

  

    /**
     * Retrieves a customer by its _id after validating that it exists.
     *
     * @param order_id The MongoDB ObjectId or string _id of the customer to retrieve.
     *
     * @returns The found customer.
     *
     * @throws CustomerNotFoundException if the customer does not exist.
     */
    public async getValidated(order_id: string | mongoose.Schema.Types.ObjectId): Promise<ICustomer> {
        const customer: ICustomer | null = await this.findById(order_id);
        if (!customer) throw new CustomerNotFoundException();
        return customer;
    }


}