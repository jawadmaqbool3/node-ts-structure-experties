"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_enum_1 = require("../../enums/transaction.enum");
const transactionSchema = new mongoose_1.default.Schema({
    currency_amount: { type: Number, required: true },
    currency_symbol: { type: String, enum: transaction_enum_1.CurrencyTypes, required: true, default: transaction_enum_1.CurrencyTypes.USDT },
    currency_contract_address: { type: String },
    transaction_network: { type: String, enum: transaction_enum_1.NetworkType, required: true, default: transaction_enum_1.NetworkType.MAINNET },
    token_contract_address: { type: String },
    transaction_time: { type: Date },
    transaction_hash: { type: String },
    currency_worth: { type: Number },
    round_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "nft_rounds", required: true },
    order_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "nft_orders", required: true },
    referral_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "referrals" },
    customer_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "customers" },
    transaction_status: { type: String, enum: transaction_enum_1.TransactionStatus, required: true, default: transaction_enum_1.TransactionStatus.PENDING },
    wallet_address: { type: String },
    chain_type: { type: String, enum: transaction_enum_1.ChainType, required: true },
    crone_status: { type: Boolean, default: true },
    mint_status: { type: String, enum: transaction_enum_1.MintStatus, required: true, default: transaction_enum_1.MintStatus.PENDING },
}, { timestamps: true });
const Transaction = mongoose_1.default.model('transactions', transactionSchema);
exports.default = Transaction;
