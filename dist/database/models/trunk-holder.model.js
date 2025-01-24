"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const trunkHolderSchema = new mongoose_1.default.Schema({
    wallet_address: { type: String, required: true },
}, { timestamps: true });
const TrunkHolder = mongoose_1.default.model('trunk_holders', trunkHolderSchema);
exports.default = TrunkHolder;
