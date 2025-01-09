import mongoose from "mongoose";

export type TGetRoundValuesParams = {
    round_id: string | mongoose.Schema.Types.ObjectId,
    nft_id: string | mongoose.Schema.Types.ObjectId,
}

