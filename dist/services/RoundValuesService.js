"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("./Service"));
const NftRoundValueRepository_1 = __importDefault(require("../repositories/NftRoundValueRepository"));
class RoundValuesService extends Service_1.default {
    /**
     * Constructor
     *
     * @param {NftRoundValueRepository} [nftRoundValueRepository] - nft round value repository
     *
     * @constructor
     */
    constructor(nftRoundValueRepository = new NftRoundValueRepository_1.default()) {
        super();
        this.nftRoundValueRepository = nftRoundValueRepository;
    }
    /**
     * Finds a RoundValue by its round_id and nft_id. If it doesn't exist, returns null.
     * @param {TGetRoundValuesParams} params - The parameters required to find a RoundValue, including round_id and nft_id.
     * @returns {Promise<INftRoundValue | null>} - A promise that resolves to the found RoundValue, or null if the RoundValue was not found.
     * @throws {MongoError} - If the operation fails, a MongoError is thrown.
     */
    getRoundValues({ round_id, nft_id }) {
        return this.nftRoundValueRepository.findOne({ round_id, nft_id });
    }
}
exports.default = RoundValuesService;
