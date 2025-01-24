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
const NftTypeRepository_1 = __importDefault(require("../repositories/NftTypeRepository"));
const Service_1 = __importDefault(require("./Service"));
const time_1 = require("../utils/time");
const FirstRoundLandingRepository_1 = __importDefault(require("../repositories/FirstRoundLandingRepository"));
const nft_types_relation_1 = require("../database/relations/nft-types.relation");
class SalesPageService extends Service_1.default {
    /**
     * Constructor for SalesPageService
     *
     * @param {NftTypeRepository} nftTypeRepository - Repository for NFT types
     * @param {FirstRoundLandingRepository} firstRoundLadingRepository - Repository for first round landings
     */
    constructor(nftTypeRepository = new NftTypeRepository_1.default(), firstRoundLadingRepository = new FirstRoundLandingRepository_1.default()) {
        super();
        this.nftTypeRepository = nftTypeRepository;
        this.firstRoundLadingRepository = firstRoundLadingRepository;
    }
    /**
     * Prepare initial sales page parameters
     *
     * @param {string} ip - ip address of the user
     *
     * @returns {Promise<INftTypeExtendedForInitialSalesPage[]>} - promise that resolves to an array of NftType objects extended with activeRound and consumedTime properties
     */
    prepareInitialSalesPageParams(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const nftTypes = yield this.nftTypeRepository.applyPipeline([
                { $lookup: nft_types_relation_1.NFT_TYPE_TO_NFTS },
                { $lookup: nft_types_relation_1.NFT_TYPE_TO_LATEST_ROUND },
            ]);
            const params = nftTypes.map((nftType) => {
                return Object.assign(Object.assign({}, nftType), { latestRound: nftType.latestRound.length ? nftType.latestRound[0] : null });
            });
            yield Promise.all(params.map((param) => __awaiter(this, void 0, void 0, function* () {
                if (param.latestRound) {
                    const firstRoundLanding = yield this.firstRoundLadingRepository.findOrCreate({
                        ip,
                        round_id: param.latestRound._id,
                    });
                    const consumedTime = firstRoundLanding.createdAt
                        ? (0, time_1.calculateDurationTillNowInSeconds)(firstRoundLanding.createdAt)
                        : 0;
                    param.consumedTime = consumedTime;
                }
            })));
            return params;
        });
    }
}
exports.default = SalesPageService;
