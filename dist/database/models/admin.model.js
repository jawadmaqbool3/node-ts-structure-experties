"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    phone_no: { type: String },
    is_junior: { type: Boolean, default: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    last_login_at: { type: Date },
    email_otp_code: { type: Number },
    active: { type: Boolean, default: true },
    is_email_otp_verified: { type: Boolean, default: false },
    is_tfa_verified: { type: Boolean, default: false },
    otp_generated_at: { type: Date },
    is_email_otp_enabled: { type: Boolean, default: false },
    is_tfa_enabled: { type: Boolean, default: false },
    tfa_secret: { type: String },
}, { timestamps: true });
const Admin = mongoose_1.default.model('admins', adminSchema);
exports.default = Admin;
