import mongoose, { Model } from 'mongoose';
import { INftRoundValue } from '../interfaces/models/nft-round-value.interface';



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
}, { timestamps: true });

const NftRoundValue: Model<INftRoundValue> = mongoose.model<INftRoundValue>('nft_round_values', nftRoundValuesSchema);



export default NftRoundValue;
