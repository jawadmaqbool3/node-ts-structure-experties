export const COMMISSION_TO_TRANSACTION_BY = {
    from: "customers",
    localField: "transaction_by",
    foreignField: "_id",
    as: "transactionBy"
}

export const COMMISSION_TO_TRANSACTION = {
    from: "transactions",
    localField: "transaction_id",
    foreignField: "_id",
    as: "transaction"
}