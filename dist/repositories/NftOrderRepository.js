"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nft_order_model_1 = __importDefault(require("../models/nft-order.model"));
const Repository_1 = __importDefault(require("./Repository"));
class NftOrderRepository extends Repository_1.default {
    /**
     * Constructs an instance of NftOrderRepository by calling the base Repository class
     * with the NftOrder model, facilitating database operations on NFT orders.
     */
    constructor() {
        super(nft_order_model_1.default);
    }
}
exports.default = NftOrderRepository;
