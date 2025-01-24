"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nftRoundValuesSchema = new mongoose_1.default.Schema({
    retail_price: { type: Number, default: 0 },
    retail_quantity_total: { type: Number, default: 0 },
    retail_quantity_sold: { type: Number, default: 0 },
    trunk_quantity_total: { type: Number, default: 0 },
    trunk_quantity_sold: { type: Number, default: 0 },
    fast_discount_quantity_total: { type: Number, default: 0 },
    fast_discount_quantity_sold: { type: Number, default: 0 },
    trunk_discount_percentage: { type: Number, default: 0 },
    fast_discount_percentage: { type: Number, default: 0 },
    round_id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "nft_rounds" },
    nft_id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "nfts" },
}, { timestamps: true });
const NftRoundValue = mongoose_1.default.model('nft_round_values', nftRoundValuesSchema);
exports.default = NftRoundValue;
