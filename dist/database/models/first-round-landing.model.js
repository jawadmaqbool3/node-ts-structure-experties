"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const firstRoundLandingSchema = new mongoose_1.default.Schema({
    ip: { type: String, required: true },
    round_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "nft_rounds" },
}, { timestamps: true });
const FirstRoundLanding = mongoose_1.default.model('first_round_landings', firstRoundLandingSchema);
exports.default = FirstRoundLanding;
