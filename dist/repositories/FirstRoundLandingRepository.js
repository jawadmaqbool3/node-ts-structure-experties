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
const FirstRoundLandingNotFoundException_1 = __importDefault(require("../exceptions/first-round-landing/FirstRoundLandingNotFoundException"));
const first_round_landing_model_1 = __importDefault(require("../database/models/first-round-landing.model"));
const mongoos_utils_1 = require("../utils/mongoos.utils");
const Repository_1 = __importDefault(require("./Repository"));
const first_round_landing_relation_1 = require("../database/relations/first-round-landing.relation");
class FirstRoundLandingRepository extends Repository_1.default {
    /**
     * Constructor for FirstRoundLandingRepository
     *
     * @constructor
     */
    constructor() {
        super(first_round_landing_model_1.default);
    }
    /**
     * Find a first round landing with its associated round
     *
     * @param {{$query: object}} query - The MongoDB query object
     *
     * @returns {Promise<IFirstRoundLandingWithRound | null>} - The first round landing document with the associated round
     */
    findOneWithRound($query) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.model.aggregate([
                { $match: $query },
                { $lookup: first_round_landing_relation_1.FIRST_ROUND_LANDING_TO_ROUND },
                { $unwind: `$${first_round_landing_relation_1.FIRST_ROUND_LANDING_TO_ROUND.as}` }
            ]);
            return (results.length ? results[0] : null);
        });
    }
    /**
     * Finds a FirstRoundLanding with its associated Round by the given ip and round_id. If it doesn't exist, throws a FirstRoundLandingNotFoundException.
     * @param ip ip address of the user
     * @param round_id id of the Round to find the FirstRoundLanding for
     * @returns the found FirstRoundLanding with its associated Round
     * @throws FirstRoundLandingNotFoundException if the FirstRoundLanding is not found
     */
    getValidatedWithRound(ip, round_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const landing = yield this.findOneWithRound({ round_id: (0, mongoos_utils_1.toObjectId)(round_id), ip });
            if (!landing)
                throw new FirstRoundLandingNotFoundException_1.default();
            return landing;
        });
    }
}
exports.default = FirstRoundLandingRepository;
