import mongoose from "mongoose";

export type TGetRoundValuesParams = {
    round_id: string | mongoose.Types.ObjectId,
    nft_id: string | mongoose.Types.ObjectId,
}

