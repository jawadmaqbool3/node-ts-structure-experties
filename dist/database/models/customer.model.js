"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    wallet_address: { type: String, required: true },
    sol_wallet_address: { type: String, required: true },
    password: { type: String, required: true },
    remember_token: { type: String },
    status: { type: Boolean, default: true },
    email: { type: String, required: true },
    grand_parent_id: { type: String },
    parent_id: { type: String },
}, { timestamps: true });
const Customer = mongoose_1.default.model('customers', customerSchema);
exports.default = Customer;
