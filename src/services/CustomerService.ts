import { Model } from "mongoose";
import { prepareCustomerAffiliateListQuery } from "../database/queries/customer.query";
import { ICustomer } from "../interfaces/models/customer.interface";
import CustomerRepository from "../repositories/CustomerRepository";
import { TFilter, TPaginationResults } from "../types/pagination.type";
import Service from "./Service";

export default class CustomerService extends Service {

    /**
     * Constructor
     *
     * @param {CustomerRepository} [customerRepository=new CustomerRepository()] - customer repository
     */
    constructor(
        private customerRepository = new CustomerRepository(),
    ) {
        super();
    }



    /**
     * Retrieves a list of customers that are directly referred by the given customer.
     *
     * @param {ICustomer} customer - The customer whose direct referrals to retrieve.
     * @param {TFilter} filters - The filters to apply to the list of customers.
     *
     * @returns {Promise<TPaginationResults<Model<ICustomer>>>} - A promise that resolves to a paginated list of customers.
     */
    public async customerAffilateList(customer: ICustomer, filters: TFilter): Promise<TPaginationResults<Model<ICustomer>>> {
        return await this.customerRepository.paginate(prepareCustomerAffiliateListQuery(customer._id), filters);
    }


}
