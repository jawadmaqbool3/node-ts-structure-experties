import { ITransaction } from "../../interfaces/models/transaction.interface";
import { interfaceToMongoProjection } from "../../utils/interface.utils";



export const CUSTOMER_VIEW_TRANSACTION = interfaceToMongoProjection<ITransaction>([
    "_id",
    "currency_amount",
    "currency_symbol",
    "transaction_time",
    "transaction_hash",
    "currency_worth",
    "wallet_address",
    "chain_type"
] as (keyof ITransaction)[]);