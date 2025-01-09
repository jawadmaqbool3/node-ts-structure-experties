"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trunk_holder_model_1 = __importDefault(require("../models/trunk-holder.model"));
const Repository_1 = __importDefault(require("./Repository"));
class TrunkHolderRepository extends Repository_1.default {
    /**
     * Constructor for TrunkHolderRepository
     * Calls the parent constructor with TrunkHolder as the model
     */
    constructor() {
        super(trunk_holder_model_1.default);
    }
    /**
     * Checks if the given wallet address is a trunk holder
     * @param wallet_address the wallet address to check
     * @returns a promise that resolves to true if the wallet address is a trunk holder, false otherwise
     */
    isTrunkHolder(wallet_address) {
        return this.isExists({ "wallet_address": { "$regex": wallet_address, "$options": "i" } });
    }
}
exports.default = TrunkHolderRepository;
