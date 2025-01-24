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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CurrencyAmountCannotBeZeroException_1 = __importDefault(require("../exceptions/transaction/CurrencyAmountCannotBeZeroException"));
const NftRoundRepository_1 = __importDefault(require("../repositories/NftRoundRepository"));
const TransactionRepository_1 = __importDefault(require("../repositories/TransactionRepository"));
const Service_1 = __importDefault(require("./Service"));
const NftOrderRepository_1 = __importDefault(require("../repositories/NftOrderRepository"));
const ReferralRepository_1 = __importDefault(require("../repositories/ReferralRepository"));
const CustomerRepository_1 = __importDefault(require("../repositories/CustomerRepository"));
const mongoos_utils_1 = require("../utils/mongoos.utils");
const transaction_enum_1 = require("../enums/transaction.enum");
const TransactionHashCannotBeEmptyException_1 = __importDefault(require("../exceptions/transaction/TransactionHashCannotBeEmptyException"));
const transaction_query_1 = require("../database/queries/transaction.query");
class TransactionService extends Service_1.default {
    /**
     * Constructor for TransactionService
     *
     * @param {TransactionRepository} transactionRepository - Repository for managing transactions
     * @param {NftRoundRepository} nftRoundRepository - Repository for managing NFT rounds
     * @param {NftOrderRepository} nftOrderRepository - Repository for managing NFT orders
     * @param {ReferralRepository} referralRepository - Repository for managing referrals
     * @param {CustomerRepository} customerRepository - Repository for managing customers
     */
    constructor(transactionRepository = new TransactionRepository_1.default(), nftRoundRepository = new NftRoundRepository_1.default(), nftOrderRepository = new NftOrderRepository_1.default(), referralRepository = new ReferralRepository_1.default(), customerRepository = new CustomerRepository_1.default()) {
        super();
        this.transactionRepository = transactionRepository;
        this.nftRoundRepository = nftRoundRepository;
        this.nftOrderRepository = nftOrderRepository;
        this.referralRepository = referralRepository;
        this.customerRepository = customerRepository;
    }
    /**
     * Creates a new transaction with the given parameters after validating the
     * round, order, referral and customer IDs if they exist.
     *
     * @param {TCreateTransactionRequest} transactionRequest - The parameters required to create a transaction
     *
     * @returns {Promise<ITransaction>} - A promise that resolves to the created transaction
     *
     * @throws {CurrencyAmountCannotBeZeroException} - If the currency amount is zero or less
     * @throws {NftRoundNotFoundException} - If the round with the given ID cannot be found
     * @throws {NftOrderNotFoundException} - If the order with the given ID cannot be found
     * @throws {ReferralNotFoundException} - If the referral with the given ID cannot be found
     * @throws {CustomerNotFoundException} - If the customer with the given ID cannot be found
     */
    createTransaction(transactionRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currency_amount, currency_symbol, currency_contract_address, transaction_network, token_contract_address, chain_type, round_id, order_id, referral_id, customer_id, transaction_hash } = transactionRequest, rest = __rest(transactionRequest, ["currency_amount", "currency_symbol", "currency_contract_address", "transaction_network", "token_contract_address", "chain_type", "round_id", "order_id", "referral_id", "customer_id", "transaction_hash"]);
            yield this.validateCreateTransactionRequest(transactionRequest);
            const sanitizedRequest = Object.assign(Object.assign({}, rest), { currency_amount,
                transaction_hash, currency_symbol: currency_symbol || transaction_enum_1.CurrencyTypes.USDT, currency_contract_address,
                transaction_network,
                token_contract_address, round_id: (0, mongoos_utils_1.toObjectId)(round_id), order_id: (0, mongoos_utils_1.toObjectId)(order_id), referral_id: referral_id ? (0, mongoos_utils_1.toObjectId)(referral_id) : null, customer_id: customer_id ? (0, mongoos_utils_1.toObjectId)(customer_id) : null, chain_type });
            const transaction = yield this.transactionRepository.create(sanitizedRequest);
            return transaction;
        });
    }
    /**
     * Updates an existing transaction with the provided parameters after validating
     * the transaction request.
     *
     * @param {TUpdateTransactionRequest} transactionRequest - The parameters required to update a transaction.
     *   - _id: The unique identifier of the transaction.
     *   - transaction_time: The timestamp of the transaction.
     *   - transaction_hash: The hash of the transaction.
     *   - transaction_status: The status of the transaction.
     *
     * @returns {Promise<ITransaction | null>} - A promise that resolves to the updated transaction
     * or null if no transaction was found with the given ID.
     *
     * @throws {TransactionNotFoundException} - If the transaction with the given ID cannot be found.
     * @throws {TransactionHashCannotBeEmptyException} - If the transaction status is successful
     * and the transaction hash is empty.
     */
    updateTransaction(transactionRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, transaction_time, transaction_hash, transaction_status, } = transactionRequest;
            yield this.validateUpdateTransactionRequest(transactionRequest);
            return yield this.transactionRepository.update(_id, {
                transaction_time,
                transaction_hash,
                transaction_status,
            });
        });
    }
    /**
     * Validates a transaction request by checking the existence of the round, order,
     * referral (if provided), and customer (if provided), and that the transaction
     * currency amount is greater than zero.
     *
     * @param {TCreateTransactionRequest} transactionRequest - The parameters required to create a transaction.
     *   - currency_amount: The amount of currency to be transferred.
     *   - round_id: The unique identifier of the round.
     *   - order_id: The unique identifier of the order.
     *   - referral_id: The unique identifier of the referral (optional).
     *   - customer_id: The unique identifier of the customer (optional).
     *
     * @throws {CurrencyAmountCannotBeZeroException} - If the currency amount is zero or less.
     * @throws {NftRoundNotFoundException} - If the round with the given ID cannot be found.
     * @throws {NftOrderNotFoundException} - If the order with the given ID cannot be found.
     * @throws {ReferralNotFoundException} - If the referral with the given ID cannot be found.
     * @throws {CustomerNotFoundException} - If the customer with the given ID cannot be found.
     */
    validateCreateTransactionRequest(_a) {
        return __awaiter(this, arguments, void 0, function* ({ round_id, order_id, referral_id, customer_id, currency_amount, chain_type, transaction_hash }) {
            if (currency_amount <= 0)
                throw new CurrencyAmountCannotBeZeroException_1.default();
            if (!transaction_hash &&
                chain_type === transaction_enum_1.ChainType.BSC ||
                chain_type === transaction_enum_1.ChainType.SOL ||
                chain_type === transaction_enum_1.ChainType.ETH)
                throw new TransactionHashCannotBeEmptyException_1.default();
            yield this.nftRoundRepository.validate(round_id);
            yield this.nftOrderRepository.validate(order_id);
            if (referral_id)
                yield this.referralRepository.validate(referral_id);
            if (customer_id)
                yield this.customerRepository.validate(customer_id);
        });
    }
    /**
     * Validates an update transaction request by checking the existence of the
     * transaction and that the transaction hash is not empty if the transaction
     * status is successful.
     *
     * @param {TUpdateTransactionRequest} transactionRequest - The parameters required to update a
     * transaction.
     *   - _id: The unique identifier of the transaction.
     *   - transaction_hash: The hash of the transaction (optional).
     *   - transaction_status: The status of the transaction (optional).
     *
     * @throws {TransactionNotFoundException} - If the transaction with the given ID cannot be found.
     * @throws {TransactionHashCannotBeEmptyException} - If the transaction status is successful and the
     * transaction hash is empty.
     */
    validateUpdateTransactionRequest(_a) {
        return __awaiter(this, arguments, void 0, function* ({ _id, transaction_hash, transaction_status }) {
            yield this.transactionRepository.validate(_id);
            if (transaction_status === transaction_enum_1.TransactionStatus.SUCCESS && !transaction_hash)
                throw new TransactionHashCannotBeEmptyException_1.default();
        });
    }
    /**
     * Retrieves a paginated list of transactions for a given customer based on the provided filters.
     *
     * @param {ICustomer} customer - The customer for whom to retrieve the transaction list.
     * @param {TFilter} filters - The filters to apply for pagination and searching.
     *
     * @returns {Promise<TPaginationResults<Model<ITransaction>>>} - A promise that resolves to the paginated results of the customer's transactions.
     */
    customerList(customer, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionRepository.paginate((0, transaction_query_1.prepareCustomerTransactionListQuery)(customer._id), filters);
        });
    }
}
exports.default = TransactionService;
