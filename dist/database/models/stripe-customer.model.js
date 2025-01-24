"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const stripeCustomer = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    stripe_id: { type: String, required: true },
}, { timestamps: true });
const StripeCustomer = mongoose_1.default.model('stripe_customers', stripeCustomer);
exports.default = StripeCustomer;
