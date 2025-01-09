"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relations = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.relations = {
    round: {
        $lookup: {
            from: "nft_rounds",
            let: { roundId: "$round_id" },
            pipeline: [
                {
                    $match: {
                        $expr: { $eq: ["$_id", "$$roundId"] }
                    }
                }
            ],
            as: "round"
        }
    }
};
const firstRoundLandingSchema = new mongoose_1.default.Schema({
    ip: { type: String, required: true },
    round_id: { type: mongoose_1.default.Types.ObjectId, ref: "nft_rounds" },
}, { timestamps: true });
const FirstRoundLanding = mongoose_1.default.model('first_round_landings', firstRoundLandingSchema);
exports.default = FirstRoundLanding;
