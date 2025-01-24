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
const TransactionNotFoundException_1 = __importDefault(require("../exceptions/transaction/TransactionNotFoundException"));
const transaction_model_1 = __importDefault(require("../database/models/transaction.model"));
const mongoos_utils_1 = require("../utils/mongoos.utils");
const Repository_1 = __importDefault(require("./Repository"));
class TransactionRepository extends Repository_1.default {
    /**
     * Constructor
     *
     * @param {Model<ITransaction>} model - model
     */
    constructor() {
        super(transaction_model_1.default);
    }
    /**
     * Validates whether a transaction exists in the database.
     *
     * @param _id The MongoDB ObjectId or string _id of the transaction to validate.
     *
     * @throws TransactionNotFoundException if the transaction does not exist.
     */
    validate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield this.isExists({ _id: (0, mongoos_utils_1.toObjectId)(_id) });
            if (!transaction)
                throw new TransactionNotFoundException_1.default();
        });
    }
}
exports.default = TransactionRepository;
