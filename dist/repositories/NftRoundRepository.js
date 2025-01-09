"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nft_round_model_1 = __importDefault(require("../models/nft-round.model"));
const Repository_1 = __importDefault(require("./Repository"));
class NftRoundRepository extends Repository_1.default {
    /**
     * Constructor for NftRoundRepository
     * Calls the constructor of the superclass, passing NftRound as the model
     */
    constructor() {
        super(nft_round_model_1.default);
    }
}
exports.default = NftRoundRepository;
