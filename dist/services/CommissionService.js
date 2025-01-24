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
const CommissionRepository_1 = __importDefault(require("../repositories/CommissionRepository"));
const Service_1 = __importDefault(require("./Service"));
const CustomerRepository_1 = __importDefault(require("../repositories/CustomerRepository"));
const commission_enum_1 = require("../enums/commission.enum");
const mongoos_utils_1 = require("../utils/mongoos.utils");
const commission_constant_1 = require("../constants/commission.constant");
const number_utils_1 = require("../utils/number.utils");
const commission_query_1 = require("../database/queries/commission.query");
class CommissionService extends Service_1.default {
    /**
     * Constructor
     *
     * @param {CommissionRepository} [commissionRepository=new CommissionRepository()] - commission repository
     * @param {CustomerRepository} [customerRepository=new CustomerRepository()] - customer repository
     */
    constructor(commissionRepository = new CommissionRepository_1.default(), customerRepository = new CustomerRepository_1.default()) {
        super();
        this.commissionRepository = commissionRepository;
        this.customerRepository = customerRepository;
    }
    /**
     * Applies commissions to the given transaction. If the transaction has a referral ID,
     * it will apply the parent and grandparent commissions to the respective customers.
     * If the transaction does not have a referral ID, it will apply the parent commission
     * to the customer with the given customer ID.
     *
     * @param {ITransaction} transaction - The transaction to which the commissions will be applied
     *
     * @returns {Promise<void>} - A promise that resolves when the commissions have been applied
     *
     * @throws {CommissionAlreadyGivenException} - If a commission has already been given for the given transaction
     */
    applyCommissions(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { referral_id, customer_id, _id } = transaction;
            yield this.commissionRepository.throwIfAlreadyExists(_id);
            if (!referral_id && !customer_id)
                if (referral_id && customer_id) {
                    const { parent, grandParent } = referral_id ?
                        yield this.getParentAndGrandParent(referral_id) :
                        yield this.getParentAndGrandParent(customer_id);
                    parent && (yield this.applyCommissionToParent(parent, transaction));
                    grandParent && (yield this.applyCommissionToGrandParent(grandParent, transaction));
                }
        });
    }
    /**
     * Applies the parent commission to the given parent customer based on the given transaction.
     *
     * @param {ICustomer} parent - The parent customer to which the commission will be applied
     * @param {ITransaction} transaction - The transaction used to calculate the commission amount
     *
     * @returns {Promise<void>} - A promise that resolves when the commission has been applied
     */
    applyCommissionToParent(parent, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.createCommissionEntry(transaction, parent._id, (0, number_utils_1.calculatePercentage)(transaction.currency_amount, commission_constant_1.PARENT_COMMISSION_PERCENTAGE), commission_constant_1.PARENT_COMMISSION_PERCENTAGE, commission_enum_1.CommissionType.PARENT);
        });
    }
    /**
     * Applies the grand parent commission to the given grand parent customer based on the given transaction.
     *
     * @param {ICustomer} grandParent - The grand parent customer to which the commission will be applied
     * @param {ITransaction} transaction - The transaction used to calculate the commission amount
     *
     * @returns {Promise<void>} - A promise that resolves when the commission has been applied
     */
    applyCommissionToGrandParent(grandParent, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.createCommissionEntry(transaction, grandParent._id, (0, number_utils_1.calculatePercentage)(transaction.currency_amount, commission_constant_1.GRAND_PARENT_COMMISSION_PERCENTAGE), commission_constant_1.PARENT_COMMISSION_PERCENTAGE, commission_enum_1.CommissionType.GRAND_PARENT);
        });
    }
    /**
     * Creates a commission entry in the repository based on the given transaction details.
     *
     * @param {ITransaction} transaction - The transaction related to the commission.
     * @param {string | mongoose.Types.ObjectId} comission_to - The ID of the customer to whom the commission is given.
     * @param {number} comission_token - The token amount of the commission.
     * @param {number} commission_percentage - The percentage of the commission.
     * @param {CommissionType} type - The type of commission (e.g., parent or grandparent).
     *
     * @returns {Promise<void>} - A promise that resolves when the commission entry is created.
     */
    createCommissionEntry(transaction, comission_to, comission_token, commission_percentage, type) {
        return __awaiter(this, void 0, void 0, function* () {
            this.commissionRepository.create({
                comission_to,
                transaction_by: transaction.customer_id ? (0, mongoos_utils_1.toObjectId)(transaction.customer_id) : undefined,
                transaction_id: transaction._id,
                transaction_network: transaction.transaction_network,
                comission_token,
                commission_percentage,
                type
            });
        });
    }
    /**
     * Retrieves the parent and grand parent customers of the given referral ID.
     *
     * @param {string | mongoose.Types.ObjectId} referral_id - The referral ID to retrieve the parent and grand parent for.
     *
     * @returns {Promise<TParentAndGrandParent>} - A promise that resolves to an object containing the parent and grand parent customers.
     */
    getParentAndGrandParent(referral_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let parent = yield this.customerRepository.findById(referral_id), grandParent = null;
            if (parent && parent.parent_id)
                grandParent = yield this.customerRepository.findById(parent.parent_id);
            return {
                parent,
                grandParent
            };
        });
    }
    /**
     * Retrieves a list of all commissions given to the given customer.
     *
     * @param {ICustomer} customer - The customer whose commissions to retrieve.
     * @param {TFilter} filters - The filters to apply to the list of commissions.
     *
     * @returns {Promise<TPaginationResults<Model<ICommission>>>} - A promise that resolves to a paginated list of commissions.
     */
    customerCommissionList(customer, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commissionRepository.paginate((0, commission_query_1.prepareCustomerCommissionListQuery)(customer._id), filters);
        });
    }
}
exports.default = CommissionService;
