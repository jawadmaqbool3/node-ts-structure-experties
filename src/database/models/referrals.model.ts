import mongoose, { Model } from 'mongoose';

import { IReferral } from '../../interfaces/models/referrals.interface';


const referralSchema = new mongoose.Schema<IReferral>({
    number_of_uses: { type: Number, default: 0 },
    referral_id: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true },
    referral_count: { type: Number, default: 0 },
}, { timestamps: true });

const Referral: Model<IReferral> = mongoose.model<IReferral>('referrals', referralSchema);

export default Referral;
