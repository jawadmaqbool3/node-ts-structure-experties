export const TRANSACTION_TO_CUSTOMER = {
    from: "customers",
    localField: "customer_id",
    foreignField: "_id",
    as: "customer"
}

export const TRANSACTION_TO_ORDER = {
    from: "nft_orders",
    localField: "order_id",
    foreignField: "_id",
    as: "order"
}

export const TRANSACTION_TO_REFERRAL = {
    from: "referrals",
    localField: "referral_id",
    foreignField: "_id",
    as: "referral"
}

export const TRANSACTION_TO_ROUND = {
    from: "nft_rounds",
    localField: "round_id",
    foreignField: "_id",
    as: "round"
}