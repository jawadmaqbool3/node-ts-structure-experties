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
const Controller_1 = __importDefault(require("../Controller"));
const CommissionService_1 = __importDefault(require("../../services/CommissionService"));
class CommissionController extends Controller_1.default {
    /**
     * Constructor
     *
     * @param {CommissionService} [commissionService=new CommissionService()] - commission service
     */
    constructor(commissionService = new CommissionService_1.default()) {
        super();
        this.commissionService = commissionService;
    }
    /**
     * Retrieves a list of commissions given to the given customer.
     *
     * @param {IExtendedCustomerRequest} req - The request object with the customer object.
     * @param {Response} res - The response object to send the list of transactions in.
     * @param {NextFunction} next - The next function to pass the error to if list fails.
     *
     * @returns {Promise<void>}
     */
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = req.query;
                const customer = req.customer;
                const transactions = customer ? yield this.commissionService.customerCommissionList(customer, filters) : null;
                return this.prepareSuccess(res, transactions);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CommissionController;
