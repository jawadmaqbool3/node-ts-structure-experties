import mongoose, { Document, Model } from 'mongoose';

export interface IFirstRoundLanding extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    ip: string;
    round_id: mongoose.Schema.Types.ObjectId;
    createdAt?: Date; 
    updatedAt?: Date;
}

export const relations = {}

const firstRoundLandingSchema = new mongoose.Schema<IFirstRoundLanding>({
    ip: { type: String, required: true },
    round_id: { type: mongoose.Types.ObjectId, ref: "nft_rounds" },
}, { timestamps: true });

const FirstRoundLanding: Model<IFirstRoundLanding> = mongoose.model<IFirstRoundLanding>('first_round_landings', firstRoundLandingSchema);



export default FirstRoundLanding;
