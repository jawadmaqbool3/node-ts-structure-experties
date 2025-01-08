import mongoose, {  Model } from 'mongoose';
import { IFirstRoundLanding } from '../interfaces/models/first-round-landing.interface';



export const relations = {
    round : {
        $lookup: {
            from: "nft_rounds",
            let: { roundId: "$round_id" },
            pipeline: [
                {
                    $match: {
                        $expr: { $eq: ["$_id", "$$roundId"] }
                    }
                }
            ],
            as: "round"
        }
    }
}

const firstRoundLandingSchema = new mongoose.Schema<IFirstRoundLanding>({
    ip: { type: String, required: true },
    round_id: { type: mongoose.Types.ObjectId, ref: "nft_rounds" },
}, { timestamps: true });

const FirstRoundLanding: Model<IFirstRoundLanding> = mongoose.model<IFirstRoundLanding>('first_round_landings', firstRoundLandingSchema);



export default FirstRoundLanding;
