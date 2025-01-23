import mongoose, { Model } from 'mongoose';
import { INftOrder } from '../../interfaces/models/nft-order.interface';
import { NftOrderStatus } from '../../enums/nft-order.enum';




const nftOrderSchema = new mongoose.Schema<INftOrder>({
    purchase_wallet: { type: String, required: true },
    target_wallet: { type: String, required: true },
    encrypted_target_wallet: { type: String, required: true },
    round_values_id: { type: mongoose.Schema.Types.ObjectId, ref: "nft_round_values", required: true },
    round_id: { type: mongoose.Schema.Types.ObjectId, ref: "nft_rounds", required: true },
    nft_id: { type: mongoose.Schema.Types.ObjectId, ref: "nfts", required: true },
    total_price: { type: Number, default: 0 },
    trunk_units_consumed: { type: Number, default: 0 },
    fast_units_consumed: { type: Number, default: 0 },
    retail_units_consumed: { type: Number, default: 0 },
    trunk_discount_amount: { type: Number, default: 0 },
    fast_discount_amount: { type: Number, default: 0 },
    units: { type: Number, default: 0 },
    status: {
        type: String,
        enum: NftOrderStatus,
        default: NftOrderStatus.PENDING,
    },
}, { timestamps: true });

const NftOrder: Model<INftOrder> = mongoose.model<INftOrder>('nft_orders', nftOrderSchema);



export default NftOrder;
