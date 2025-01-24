"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_enum_1 = require("../../enums/transaction.enum");
const commission_enum_1 = require("../../enums/commission.enum");
const commissionSchema = new mongoose_1.default.Schema({
    comission_to: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "customers" },
    transaction_by: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "customers" },
    transaction_id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "transactions" },
    transaction_network: { type: String, enum: transaction_enum_1.NetworkType },
    comission_token: { type: Number, required: true },
    commission_status: { type: Boolean, required: true, default: false },
    commission_percentage: { type: Number, required: true },
    type: { type: String, enum: commission_enum_1.CommissionType, required: true },
}, { timestamps: true });
const Commission = mongoose_1.default.model('commisions', commissionSchema);
exports.default = Commission;
