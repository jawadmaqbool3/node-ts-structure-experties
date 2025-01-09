"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relations = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.relations = {};
const nftOrderSchema = new mongoose_1.default.Schema({
    purchase_wallet: { type: String, required: true },
    target_wallet: { type: String, required: true },
    encrypted_target_wallet: { type: String, required: true },
    round_values_id: { type: mongoose_1.default.Types.ObjectId, ref: "nft_round_values", required: true },
    round_id: { type: mongoose_1.default.Types.ObjectId, ref: "nft_rounds", required: true },
    nft_id: { type: mongoose_1.default.Types.ObjectId, ref: "nfts", required: true },
    total_price: { type: Number, default: 0 },
    trunk_units_consumed: { type: Number, default: 0 },
    fast_units_consumed: { type: Number, default: 0 },
    retail_units_consumed: { type: Number, default: 0 },
    trunk_discount_amount: { type: Number, default: 0 },
    fast_discount_amount: { type: Number, default: 0 },
    units: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["PAID", "PENDING", "REVERTED"],
        default: "PENDING",
    },
}, { timestamps: true });
const NftOrder = mongoose_1.default.model('nft_orders', nftOrderSchema);
exports.default = NftOrder;
