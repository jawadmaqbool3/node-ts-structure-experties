"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relations = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.relations = {};
const nftSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    booths: { type: Number, default: 0 },
    nft_type_id: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "nft_types" },
}, { timestamps: true });
const Nft = mongoose_1.default.model('nfts', nftSchema);
exports.default = Nft;
