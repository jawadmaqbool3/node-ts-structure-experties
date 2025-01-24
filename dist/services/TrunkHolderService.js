"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("./Service"));
const TrunkHolderRepository_1 = __importDefault(require("../repositories/TrunkHolderRepository"));
class TrunkHolderService extends Service_1.default {
    /**
     * Constructor for TrunkHolderService
     *
     * @param {TrunkHolderRepository} trunkHolderRepository - The repository to interact with trunk holder data
     */
    /**
     * Constructor for TrunkHolderService
     *
     * @param {TrunkHolderRepository} [trunkHolderRepository = new TrunkHolderRepository()] - The repository to interact with trunk holder data
     */
    constructor(trunkHolderRepository = new TrunkHolderRepository_1.default()) {
        super();
        this.trunkHolderRepository = trunkHolderRepository;
    }
    isTrunkHolder(wallet_address) {
        return this.trunkHolderRepository.isTrunkHolder(wallet_address);
    }
}
exports.default = TrunkHolderService;
