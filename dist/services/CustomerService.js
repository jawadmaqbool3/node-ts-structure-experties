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
const customer_query_1 = require("../database/queries/customer.query");
const CustomerRepository_1 = __importDefault(require("../repositories/CustomerRepository"));
const Service_1 = __importDefault(require("./Service"));
class CustomerService extends Service_1.default {
    /**
     * Constructor
     *
     * @param {CustomerRepository} [customerRepository=new CustomerRepository()] - customer repository
     */
    constructor(customerRepository = new CustomerRepository_1.default()) {
        super();
        this.customerRepository = customerRepository;
    }
    /**
     * Retrieves a list of customers that are directly referred by the given customer.
     *
     * @param {ICustomer} customer - The customer whose direct referrals to retrieve.
     * @param {TFilter} filters - The filters to apply to the list of customers.
     *
     * @returns {Promise<TPaginationResults<Model<ICustomer>>>} - A promise that resolves to a paginated list of customers.
     */
    customerAffilateList(customer, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerRepository.paginate((0, customer_query_1.prepareCustomerAffiliateListQuery)(customer._id), filters);
        });
    }
}
exports.default = CustomerService;
