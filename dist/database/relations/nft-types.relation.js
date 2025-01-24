"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFT_TYPE_TO_LATEST_ROUND = exports.NFT_TYPE_TO_ROUNDS = exports.NFT_TYPE_TO_NFTS = void 0;
exports.NFT_TYPE_TO_NFTS = {
    from: "nfts",
    localField: "_id",
    foreignField: "nft_type_id",
    as: "nfts"
};
exports.NFT_TYPE_TO_ROUNDS = {
    from: "nft_rounds",
    localField: "_id",
    foreignField: "nft_type_id",
    as: "rounds"
};
exports.NFT_TYPE_TO_LATEST_ROUND = {
    from: "nft_rounds",
    localField: "_id",
    foreignField: "nft_type_id",
    as: "latestRound",
    pipeline: [
        {
            $sort: { _id: -1 }
        },
        {
            $limit: 1
        }
    ]
};
