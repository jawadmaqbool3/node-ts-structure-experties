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
const referrals_model_1 = __importDefault(require("../database/models/referrals.model"));
const ReferralNotFoundException_1 = __importDefault(require("../exceptions/referral/ReferralNotFoundException"));
class ReferralRepository extends Repository_1.default {
    /**
     * Constructor for ReferralRepository
     *
     * @constructor
     */
    constructor() {
        super(referrals_model_1.default);
    }
    /**
     * Validates whether a referral exists in the database.
     *
     * @param _id The MongoDB ObjectId or string _id of the referral to validate.
     *
     * @throws ReferralNotFoundException if the referral does not exist.
     */
    validate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.isExists({ _id: (0, mongoos_utils_1.toObjectId)(_id) });
            if (!customer)
                throw new ReferralNotFoundException_1.default();
        });
    }
    /**
     * Retrieves a referral by its _id after validating that it exists.
     *
     * @param order_id The MongoDB ObjectId or string _id of the referral to retrieve.
     *
     * @returns The found referral.
     *
     * @throws ReferralNotFoundException if the referral does not exist.
     */
    getValidated(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const referral = yield this.findById(order_id);
            if (!referral)
                throw new ReferralNotFoundException_1.default();
            return referral;
        });
    }
}
exports.default = ReferralRepository;
