"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nft_type_model_1 = __importDefault(require("../database/models/nft-type.model"));
const Repository_1 = __importDefault(require("./Repository"));
class NftTypeRepository extends Repository_1.default {
    /**
     * Constructor
     *
     * @param {Model<INftType>} model - model
     */
    constructor() {
        super(nft_type_model_1.default);
    }
}
exports.default = NftTypeRepository;
