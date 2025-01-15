import mongoose, { Document } from "mongoose";
import {
    ChainType,
    CurrencyTypes,
    MintStatus,
    NetworkType,
    TransactionStatus
} from "../../enums/transaction.enum";


export interface ITransactionBase {
    currency_amount: number;
    currency_symbol: CurrencyTypes;
    currency_contract_address: string | null;
    transaction_network: NetworkType;
    token_contract_address: string | null;
    transaction_time: Date;
    transaction_hash: string | null;
    currency_worth: number;
    round_id: mongoose.Schema.Types.ObjectId;
    order_id: mongoose.Schema.Types.ObjectId;
    referral_id: mongoose.Schema.Types.ObjectId | null;
    customer_id: mongoose.Schema.Types.ObjectId | null;
    transaction_status: TransactionStatus;
    wallet_address: string | null;
    chain_type: ChainType;
    crone_status: boolean;
    mint_status: MintStatus;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface ITransaction extends ITransactionBase, Document {
    _id: mongoose.Schema.Types.ObjectId;
}

export interface ITransactionLean extends ITransactionBase {
    _id: mongoose.Schema.Types.ObjectId;
}


