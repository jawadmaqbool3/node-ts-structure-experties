import mongoose, { Model } from 'mongoose';
import { INftRound } from '../interfaces/models/nft-round.interface';



export const relations = {

}

const nftRoundSchema = new mongoose.Schema<INftRound>({
    name: { type: String, required: true },
    nft_type_id: { type: mongoose.Types.ObjectId, required: true, ref: "nft_types" },
    duration_days: { type: Number, default: 0 },
    fast_discount_duration_hours: { type: Number, default: 0 },
}, { timestamps: true });

const NftRound: Model<INftRound> = mongoose.model<INftRound>('nft_rounds', nftRoundSchema);



export default NftRound;
