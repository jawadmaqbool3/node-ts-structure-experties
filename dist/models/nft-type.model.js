"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relations = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.relations = {
    withNfts: {
        $lookup: {
            from: "nfts",
            let: { nftTypeId: "$_id" },
            pipeline: [
                {
                    $match: {
                        $expr: { $eq: ["$nft_type_id", "$$nftTypeId"] }
                    }
                }
            ],
            as: "nfts"
        }
    },
    withLatestRound: {
        $lookup: {
            from: "nft_rounds",
            let: { nftTypeId: "$_id" },
            pipeline: [
                {
                    $match: {
                        $expr: { $eq: ["$nft_type_id", "$$nftTypeId"] }
                    }
                },
                {
                    $sort: { _id: -1 }
                },
                {
                    $limit: 1
                }
            ],
            as: "latestRound"
        }
    }
};
const nftTypeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
const NftType = mongoose_1.default.model('nft_types', nftTypeSchema);
exports.default = NftType;
