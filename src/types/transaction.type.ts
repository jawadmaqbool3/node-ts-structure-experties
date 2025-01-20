import mongoose from "mongoose";
import { ChainType, CurrencyTypes, NetworkType, TransactionStatus } from "../enums/transaction.enum";

export type TCreateTransactionRequest = {
    currency_amount: number,
    currency_symbol: CurrencyTypes,
    currency_contract_address: string | undefined,
    transaction_network: NetworkType,
    token_contract_address: string | undefined,
    currency_worth: number | undefined,
    round_id: string,
    order_id: string,
    referral_id: string | undefined,
    wallet_address: string | undefined,
    customer_id: string | undefined,
    transaction_hash?: string,
    chain_type: ChainType,
}


export type TUpdateTransactionRequest = {
    _id: string | mongoose.Types.ObjectId,
    transaction_time: Date,
    transaction_hash: string,
    transaction_status: TransactionStatus,
};