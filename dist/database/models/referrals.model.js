"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const referralSchema = new mongoose_1.default.Schema({
    number_of_uses: { type: Number, default: 0 },
    referral_id: { type: String, required: true },
    user_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "customers", required: true },
    referral_count: { type: Number, default: 0 },
}, { timestamps: true });
const Referral = mongoose_1.default.model('referrals', referralSchema);
exports.default = Referral;
