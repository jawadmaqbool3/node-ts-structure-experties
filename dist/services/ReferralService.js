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
const Service_1 = __importDefault(require("./Service"));
const ReferralRepository_1 = __importDefault(require("../repositories/ReferralRepository"));
class ReferralService extends Service_1.default {
    constructor(referralRepository = new ReferralRepository_1.default()) {
        super();
        this.referralRepository = referralRepository;
    }
    /**
     * Retrieves referral information based on the provided referral ID.
     *
     * @param {string} referral_id - The unique identifier of the referral to retrieve.
     * @returns {Promise<IReferral | null>} - A promise that resolves to the referral information if found, or null if not found.
     */
    getReferralInfo(referral_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.referralRepository.findOne({ referral_id });
        });
    }
}
exports.default = ReferralService;
