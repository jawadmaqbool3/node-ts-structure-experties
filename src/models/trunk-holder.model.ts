import mongoose, { Model } from 'mongoose';
import { ITrunkHolder } from '../interfaces/models/trunk-holder.interface';



export const relations = {}

const trunkHolderSchema = new mongoose.Schema<ITrunkHolder>({
    wallet_address: { type: String, required: true },
}, { timestamps: true });

const TrunkHolder: Model<ITrunkHolder> = mongoose.model<ITrunkHolder>('trunk_holders', trunkHolderSchema);



export default TrunkHolder;
