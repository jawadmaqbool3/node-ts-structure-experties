import mongoose, { Document, Model } from 'mongoose';

export interface INftType extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: { type: String, required: [true] },
    createdAt?: Date; 
    updatedAt?: Date;
}

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
            as: "latest_round"
        }
    }
}

const nftTypeSchema = new mongoose.Schema<INftType>({
    name: { type: String, required: true },
}, { timestamps: true });

const NftType: Model<INftType> = mongoose.model<INftType>('nft_types', nftTypeSchema);



export default NftType;
