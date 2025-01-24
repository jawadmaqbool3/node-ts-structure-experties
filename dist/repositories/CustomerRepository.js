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
const mongoos_utils_1 = require("../utils/mongoos.utils");
const Repository_1 = __importDefault(require("./Repository"));
const customer_model_1 = __importDefault(require("../database/models/customer.model"));
const CustomerNotFoundException_1 = __importDefault(require("../exceptions/customer/CustomerNotFoundException"));
class CustomerRepository extends Repository_1.default {
    /**
     * Constructor for CustomerRepository
     *
     * @constructor
     */
    constructor() {
        super(customer_model_1.default);
    }
    /**
     * Validates whether a customer exists in the database.
     *
     * @param _id The MongoDB ObjectId or string _id of the customer to validate.
     * @throws CustomerNotFoundException if the customer does not exist.
     */
    validate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.isExists({ _id: (0, mongoos_utils_1.toObjectId)(_id) });
            if (!customer)
                throw new CustomerNotFoundException_1.default();
        });
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
    getValidated(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.findById(order_id);
            if (!customer)
                throw new CustomerNotFoundException_1.default();
            return customer;
        });
    }
    /**
     * Searches for a customer by their email address in a case-insensitive manner.
     *
     * @param email The email address to search for.
     *
     * @returns A promise that resolves to the found customer or null if no customer matches the email address.
     */
    searchByEmail(email) {
        return this.findOne({ "email": { "$regex": `^${email}$`, "$options": "i" } });
    }
}
exports.default = CustomerRepository;
