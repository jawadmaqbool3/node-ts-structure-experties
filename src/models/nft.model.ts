import mongoose, { Model } from 'mongoose';
import { INft } from '../interfaces/models/nft.interface';



export const relations = {}

const nftSchema = new mongoose.Schema<INft>({
    name: { type: String, required: true },
    booths: { type: Number, default: 0 },
    nft_type_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "nft_types" },
}, { timestamps: true });

const Nft: Model<INft> = mongoose.model<INft>('nfts', nftSchema);



export default Nft;
