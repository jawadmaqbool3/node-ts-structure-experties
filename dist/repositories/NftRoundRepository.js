"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoundNotFoundException_1 = __importDefault(require("../exceptions/nft-round/RoundNotFoundException"));
const nft_round_model_1 = __importDefault(require("../database/models/nft-round.model"));
const mongoos_utils_1 = require("../utils/mongoos.utils");
const Repository_1 = __importDefault(require("./Repository"));
class NftRoundRepository extends Repository_1.default {
    /**
     * Constructor for NftRoundRepository
     * Calls the constructor of the superclass, passing NftRound as the model
     */
    constructor() {
        super(nft_round_model_1.default);
    }
    /**
     * Validates whether an NFT round exists in the database.
     * @param _id The MongoDB ObjectId or string _id of the round to validate.
     * @throws RoundNotFoundException if the round does not exist.
     */
    validate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const round = yield this.isExists({ _id: (0, mongoos_utils_1.toObjectId)(_id) });
            if (!round)
                throw new RoundNotFoundException_1.default();
        });
    }
    /**
     * Finds a Round by its id. If it doesn't exist, throws a RoundNotFoundException.
     * @param round_id id of the Round to find
     * @returns the found Round
     * @throws RoundNotFoundException if the Round is not found
     */
    getValidated(round_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const round = yield this.findById(round_id);
            if (!round)
                throw new RoundNotFoundException_1.default();
            return round;
        });
    }
}
exports.default = NftRoundRepository;
