import mongoose, { Model } from 'mongoose';
import { INftType } from '../../interfaces/models/nft-types.interface';




const nftTypeSchema = new mongoose.Schema<INftType>({
    name: { type: String, required: true },
}, { timestamps: true });

const NftType: Model<INftType> = mongoose.model<INftType>('nft_types', nftTypeSchema);



export default NftType;
