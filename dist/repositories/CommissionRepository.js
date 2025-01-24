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
const Repository_1 = __importDefault(require("./Repository"));
const commission_model_1 = __importDefault(require("../database/models/commission.model"));
const mongoos_utils_1 = require("../utils/mongoos.utils");
const CommissionAlreadyGivenException_1 = __importDefault(require("../exceptions/commission/CommissionAlreadyGivenException"));
class CommissionRepository extends Repository_1.default {
    /**
     * Initializes a new instance of the CommissionRepository class.
     *
     * This constructor calls the base Repository class constructor with the Commission model,
     * setting up the repository for Commission documents.
     */
    constructor() {
        super(commission_model_1.default);
    }
    /**
     * Throws a CommissionAlreadyGivenException if a commission has already been given
     * for the given transaction ID.
     *
     * @param {string | mongoose.Types.ObjectId} transaction_id - The ID of the transaction
     *
     * @throws {CommissionAlreadyGivenException} - If a commission has already been given for the given transaction ID
     *
     * @returns {Promise<void>} - A promise that resolves when the operation is complete
     */
    throwIfAlreadyExists(transaction_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isExists({ transaction_id: (0, mongoos_utils_1.toObjectId)(transaction_id) }))
                throw new CommissionAlreadyGivenException_1.default();
        });
    }
}
exports.default = CommissionRepository;
