"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nftRoundSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    nft_type_id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "nft_types" },
    duration_days: { type: Number, default: 0 },
    fast_discount_duration_hours: { type: Number, default: 0 },
}, { timestamps: true });
const NftRound = mongoose_1.default.model('nft_rounds', nftRoundSchema);
exports.default = NftRound;
