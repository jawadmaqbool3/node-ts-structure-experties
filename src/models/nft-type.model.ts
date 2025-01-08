import mongoose, { Document, Model } from 'mongoose';
import { INftType } from '../interfaces/models/nft-types.interface';



export const relations = {
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
}

const nftTypeSchema = new mongoose.Schema<INftType>({
    name: { type: String, required: true },
}, { timestamps: true });

const NftType: Model<INftType> = mongoose.model<INftType>('nft_types', nftTypeSchema);



export default NftType;
