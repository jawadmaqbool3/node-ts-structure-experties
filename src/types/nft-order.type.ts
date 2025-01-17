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
    round_id: string | mongoose.Types.ObjectId,
    nft_id: string | mongoose.Types.ObjectId,
    trunk_discount_amount: number,
    fast_discount_amount: number,
    target_wallet: string,
}


export type TNftApplicableDiscountQuantity = {
    applicableFastDiscountUnits: number,
    applicableTrunkDiscountUnits: number,
    applicableRetailUnits: number
}

export type TNftAvailableQuantity = {
    availableTrunkHoldersQuantity: number,
    availableFastQuantity: number,
    availableRetailQuantity: number
}

export type TNftDiscountAmounts = {
    trunkHolderDiscountAmount: number,
    fastDiscountAmount: number
}