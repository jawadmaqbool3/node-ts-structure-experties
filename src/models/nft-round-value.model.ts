import mongoose, { Document, Model } from 'mongoose';

export interface INftRoundValue extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    retail_price: number;
    retail_quantity_total: number;
    retail_quantity_sold: number;
    trunk_quantity_total: number;
    trunk_quantity_sold: number;
    fast_discount_quantity_total: number;
    fast_discount_quantity_sold: number;
    trunk_discount_percentage: number;
    fast_discount_percentage: number;
    round_id: mongoose.Schema.Types.ObjectId;
    nft_id: mongoose.Schema.Types.ObjectId;
    fast_discount_duration_hours: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export const relations = {

}

const nftRoundValuesSchema = new mongoose.Schema<INftRoundValue>({
    retail_price: { type: Number, default: 0 },
    retail_quantity_total: { type: Number, default: 0 },
    retail_quantity_sold: { type: Number, default: 0 },
    trunk_quantity_total: { type: Number, default: 0 },
    trunk_quantity_sold: { type: Number, default: 0 },
    fast_discount_quantity_total: { type: Number, default: 0 },
    fast_discount_quantity_sold: { type: Number, default: 0 },
    trunk_discount_percentage: { type: Number, default: 0 },
    fast_discount_percentage: { type: Number, default: 0 },
    round_id: { type: mongoose.Types.ObjectId, required: true, ref: "nft_rounds" },
    nft_id: { type: mongoose.Types.ObjectId, required: true, ref: "nfts" },
    fast_discount_duration_hours: { type: Number, default: 0 },
}, { timestamps: true });

const NftRoundValue: Model<INftRoundValue> = mongoose.model<INftRoundValue>('nft_round_values', nftRoundValuesSchema);



export default NftRoundValue;
