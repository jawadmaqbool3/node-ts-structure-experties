import mongoose from "mongoose";

export type TPlaceOrderRequestParams = {
    ip: string,
    round_values_id: string,
    purchase_wallet: string,
    units: number,
    total_price: number,
    trunk_units_consumed: number,
    fast_units_consumed: number,
    retail_units_consumed: number,
    round_id: string | mongoose.Schema.Types.ObjectId,
    nft_id: string | mongoose.Schema.Types.ObjectId,
    trunk_discount_amount: number,
    fast_discount_amount: number,
}