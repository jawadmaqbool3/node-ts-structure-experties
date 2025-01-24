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
const Controller_1 = __importDefault(require("./Controller"));
const SalesPageService_1 = __importDefault(require("../services/SalesPageService"));
const NftOrderService_1 = __importDefault(require("../services/NftOrderService"));
const TrunkHolderService_1 = __importDefault(require("../services/TrunkHolderService"));
const RoundValuesService_1 = __importDefault(require("../services/RoundValuesService"));
const StripeService_1 = __importDefault(require("../services/StripeService"));
const TransactionService_1 = __importDefault(require("../services/TransactionService"));
const ReferralService_1 = __importDefault(require("../services/ReferralService"));
const CommissionService_1 = __importDefault(require("../services/CommissionService"));
class PublicController extends Controller_1.default {
    /**
     * Constructor
     *
     * @param {SalesPageService} salesPageService - sales page service
     * @param {NftOrderService} nftOrderService - nft order service
     * @param {TrunkHolderService} trunkHolderService - trunk holder service
     * @param {RoundValuesService} roundValueService - round value service
     */
    constructor(salesPageService = new SalesPageService_1.default(), nftOrderService = new NftOrderService_1.default(), trunkHolderService = new TrunkHolderService_1.default(), roundValueService = new RoundValuesService_1.default(), stripeService = new StripeService_1.default(), transactionService = new TransactionService_1.default(), referralService = new ReferralService_1.default(), commissionService = new CommissionService_1.default()) {
        super();
        this.salesPageService = salesPageService;
        this.nftOrderService = nftOrderService;
        this.trunkHolderService = trunkHolderService;
        this.roundValueService = roundValueService;
        this.stripeService = stripeService;
        this.transactionService = transactionService;
        this.referralService = referralService;
        this.commissionService = commissionService;
    }
    /**
     * Get initial sales page parameters
     *
     * @param {IExtendedCustomerRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    getInitialSalesPageParams(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.checkedIp ? yield this.salesPageService.prepareInitialSalesPageParams(req.checkedIp) : [];
                return this.prepareSuccess(res, params);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Place order
     *
     * @param {IExtendedCustomerRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    placeOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderParams = Object.assign({ ip: req.checkedIp }, req.body);
                const order = req.checkedIp ? yield this.nftOrderService.placeOrder(orderParams) : null;
                return this.prepareSuccess(res, { order });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Check if given wallet address is a trunk holder
     *
     * @param {IExtendedCustomerRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    checkTrunkHolder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { wallet_address } = req.body;
                const isTrunkHolder = wallet_address && (yield this.trunkHolderService.isTrunkHolder(wallet_address));
                return this.prepareSuccess(res, { isTrunkHolder });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Get round values
     *
     * @param {IExtendedCustomerRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    getNftRoundValues(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryParams = Object.assign({}, req.body);
                const roundValues = yield this.roundValueService.getRoundValues(queryParams);
                return this.prepareSuccess(res, { roundValues });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Creates a stripe payment intent
     *
     * @param {IExtendedCustomerRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    createStripePaymentIntent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const intentRequest = Object.assign({}, req.body);
                const paymentIntent = yield this.stripeService.createPaymentIntent(intentRequest);
                return this.prepareSuccess(res, { paymentIntent });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Creates a new transaction based on the request body and returns the created transaction.
     *
     * @param {IExtendedCustomerRequest} req - The incoming request containing transaction details in the body.
     * @param {Response} res - The response object used to return the result of the transaction creation.
     *
     * @returns {Promise<void>} - A promise that resolves when the response is sent back to the client.
     */
    createTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = req.customer;
                const transactionRequest = Object.assign(Object.assign({}, req.body), { customer_id: (customer === null || customer === void 0 ? void 0 : customer._id) || null });
                const transaction = yield this.transactionService.createTransaction(transactionRequest);
                return this.prepareSuccess(res, { transaction });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Updates an existing transaction based on the request body and returns the updated transaction.
     *
     * @param {IExtendedCustomerRequest} req - The incoming request containing transaction details in the body.
     * @param {Response} res - The response object used to return the result of the transaction creation.
     *
     * @returns {Promise<void>} - A promise that resolves when the response is sent back to the client.
     */
    updateTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionRequest = Object.assign({}, req.body);
                const transaction = yield this.transactionService.updateTransaction(transactionRequest);
                if (transaction)
                    yield this.commissionService.applyCommissions(transaction);
                return this.prepareSuccess(res, { transaction });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Retrieves referral information based on the referral ID provided in the request parameters.
     *
     * @param {IExtendedCustomerRequest} req - The incoming request containing the referral ID in the parameters.
     * @param {Response} res - The response object used to return the referral information.
     *
     * @returns {Promise<void>} - A promise that resolves when the response is sent back to the client.
     */
    getReferralInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refferalId } = req.params;
                const transaction = yield this.referralService.getReferralInfo(refferalId);
                return this.prepareSuccess(res, { transaction });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = PublicController;
