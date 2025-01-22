import mongoose, {  Model } from 'mongoose';
import { IFirstRoundLanding } from '../../interfaces/models/first-round-landing.interface';



const firstRoundLandingSchema = new mongoose.Schema<IFirstRoundLanding>({
    ip: { type: String, required: true },
    round_id: { type: mongoose.Schema.Types.ObjectId, ref: "nft_rounds" },
}, { timestamps: true });

const FirstRoundLanding: Model<IFirstRoundLanding> = mongoose.model<IFirstRoundLanding>('first_round_landings', firstRoundLandingSchema);



export default FirstRoundLanding;
