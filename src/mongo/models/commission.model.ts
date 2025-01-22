import mongoose, { Model } from 'mongoose';
import { NetworkType } from '../../enums/transaction.enum';
import { CommissionType } from '../../enums/commission.enum';
import { ICommission } from '../../interfaces/models/commission.interface';




export const relations = {}

const commissionSchema = new mongoose.Schema<ICommission>({
    comission_to: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "customers" },
    transaction_by: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "customers" },
    transaction_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "transactions" },
    transaction_network: {type: String, enum: NetworkType},
    comission_token: { type: Number, required: true },
    commission_status: { type: Boolean, required: true, default: false },
    commission_percentage: { type: Number, required: true },
    type: { type: String, enum: CommissionType, required: true },
}, { timestamps: true });

const Commission: Model<ICommission> = mongoose.model<ICommission>('commissions', commissionSchema);



export default Commission;
