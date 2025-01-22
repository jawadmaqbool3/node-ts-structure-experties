export const NFT_TYPE_TO_NFTS = {
    from: "nfts",
    localField: "_id",
    foreignField: "nft_type_id",
    as: "nfts"
}

export const NFT_TYPE_TO_ROUNDS = {
    from: "nft_rounds",
    localField: "_id",
    foreignField: "nft_type_id",
    as: "rounds"
}

export const NFT_TYPE_TO_LATEST_ROUND = {
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
}