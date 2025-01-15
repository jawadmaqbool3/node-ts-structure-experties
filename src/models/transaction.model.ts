import mongoose, { Model } from 'mongoose';
import { ITransaction } from '../interfaces/models/transaction.interface';
import { ChainType, CurrencyTypes, MintStatus, NetworkType, TransactionStatus } from '../enums/transaction.enum';

export const relations = {}

const transactionSchema = new mongoose.Schema<ITransaction>({
    currency_amount: { type: Number, required: true },
    currency_symbol: { type: String, enum: CurrencyTypes, required: true, default: CurrencyTypes.USDT },
    currency_contract_address: { type: String },
    transaction_network: { type: String, enum: NetworkType, required: true, default: NetworkType.MAINNET },
    token_contract_address: { type: String },
    transaction_time: { type: Date, required: true },
    transaction_hash: { type: String },
    currency_worth: { type: Number },
    round_id: { type: mongoose.Schema.Types.ObjectId, ref: "nft_rounds", required: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "nft_orders", required: true },
    referral_id: { type: mongoose.Schema.Types.ObjectId, ref: "referrals"},
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true },
    transaction_status: { type: String, enum: TransactionStatus, required: true, default: TransactionStatus.PENDING },
    wallet_address: { type: String },
    chain_type: { type: String, enum: ChainType, required: true },
    crone_status: { type: Boolean, default: true },
    mint_status: { type: String, enum: MintStatus, required: true, default: MintStatus.PENDING },
}, { timestamps: true });

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>('trunk_holders', transactionSchema);



export default Transaction;
