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
const Service_1 = __importDefault(require("./Service"));
const NftRoundValueRepository_1 = __importDefault(require("../repositories/NftRoundValueRepository"));
const FirstRoundLandingRepository_1 = __importDefault(require("../repositories/FirstRoundLandingRepository"));
const TrunkHolderRepository_1 = __importDefault(require("../repositories/TrunkHolderRepository"));
const NftOrderRepository_1 = __importDefault(require("../repositories/NftOrderRepository"));
const NftRoundRepository_1 = __importDefault(require("../repositories/NftRoundRepository"));
const mongoos_utils_1 = require("../utils/mongoos.utils");
const time_1 = require("../utils/time");
const nft_order_utils_1 = require("../utils/nft-order.utils");
const RoundNotFoundException_1 = __importDefault(require("../exceptions/nft-round/RoundNotFoundException"));
const FirstRoundLandingNotFoundException_1 = __importDefault(require("../exceptions/first-round-landing/FirstRoundLandingNotFoundException"));
class NftOrderService extends Service_1.default {
    /**
     * Constructor
     *
     * @param {NftRoundValueRepository} nftRoundValuesRepository - nft round value repository
     * @param {FirstRoundLandingRepository} firstLandingRepository - first round landing repository
     * @param {NftRoundRepository} nftRoundRepository - nft round repository
     * @param {TrunkHolderRepository} trunkHolderRepository - trunk holder repository
     * @param {NftOrderRepository} nftOrderRepository - nft order repository
     *
     * @constructor
     */
    constructor(nftRoundValuesRepository = new NftRoundValueRepository_1.default(), firstLandingRepository = new FirstRoundLandingRepository_1.default(), nftRoundRepository = new NftRoundRepository_1.default(), trunkHolderRepository = new TrunkHolderRepository_1.default(), nftOrderRepository = new NftOrderRepository_1.default()) {
        super();
        this.nftRoundValuesRepository = nftRoundValuesRepository;
        this.firstLandingRepository = firstLandingRepository;
        this.nftRoundRepository = nftRoundRepository;
        this.trunkHolderRepository = trunkHolderRepository;
        this.nftOrderRepository = nftOrderRepository;
    }
    /**
     * Places an NFT order with the given parameters after validating quantities,
     * calculating applicable discounts, and ensuring the round is active.
     *
     * @param {TPlaceOrderRequestParams} params - The parameters required to place an order, including
     * purchase wallet, round values ID, units, total price, etc.
     *
     * @returns {Promise<INftOrder>} - A promise that resolves to the created NFT order.
     *
     * @throws {RoundNotFoundException} - If the specified round cannot be found.
     * @throws {FirstRoundLandingNotFoundException} - If the first round landing cannot be retrieved.
     * @throws {NotEnoughQuantityAvailableException} - If the required quantity is not available.
     * @throws {OrderAmountValidationFailedException} - If the calculated order amount is invalid.
     */
    placeOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const roundValue = yield this.getRoundValues(params.round_values_id);
            const firstRoundLanding = yield this.getFirstRoundLanding(params.ip, roundValue.round_id);
            const round = yield this.getRound(roundValue.round_id);
            const timeConsumed = (0, time_1.calculateDurationTillNowInSeconds)(firstRoundLanding.createdAt || new Date());
            (0, nft_order_utils_1.ensureRoundIsActive)(timeConsumed, round.duration_days);
            let isDiscountApplicable = (0, nft_order_utils_1.isFastDiscountApplicable)(timeConsumed, firstRoundLanding.round.fast_discount_duration_hours);
            const isTrunkHolder = yield this.trunkHolderRepository.isTrunkHolder(params.purchase_wallet);
            const { applicableFastDiscountUnits, applicableTrunkDiscountUnits, applicableRetailUnits } = (0, nft_order_utils_1.validateAvailableQuantity)(roundValue, params.units, isDiscountApplicable, isTrunkHolder);
            const { trunkHolderDiscountAmount, fastDiscountAmount } = (0, nft_order_utils_1.calculateValidatedDiscountAmounts)(roundValue, params.units, applicableTrunkDiscountUnits, applicableFastDiscountUnits);
            yield this.nftRoundValuesRepository.decrementUnits(roundValue._id, {
                applicableTrunkDiscountUnits,
                applicableFastDiscountUnits,
                applicableRetailUnits
            });
            return this.nftOrderRepository.create({
                purchase_wallet: params.purchase_wallet,
                round_values_id: (0, mongoos_utils_1.toObjectId)(params.round_values_id),
                round_id: params.round_id,
                nft_id: params.nft_id,
                total_price: params.total_price,
                trunk_units_consumed: applicableTrunkDiscountUnits,
                fast_units_consumed: applicableFastDiscountUnits,
                retail_units_consumed: applicableRetailUnits,
                trunk_discount_amount: trunkHolderDiscountAmount,
                fast_discount_amount: fastDiscountAmount,
                units: params.units,
            });
        });
    }
    /**
     * Finds a RoundValue by its id. If it doesn't exist, throws a RoundNotFoundException.
     * @param round_values_id id of the RoundValue to find
     * @returns the found RoundValue
     * @throws RoundNotFoundException if the RoundValue is not found
     */
    getRoundValues(round_values_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const roundValue = yield this.nftRoundValuesRepository.findById(round_values_id);
            if (!roundValue)
                throw new RoundNotFoundException_1.default();
            return roundValue;
        });
    }
    /**
     * Finds a FirstRoundLanding with its associated Round by the given ip and round_id. If it doesn't exist, throws a FirstRoundLandingNotFoundException.
     * @param ip ip address of the user
     * @param round_id id of the Round to find the FirstRoundLanding for
     * @returns the found FirstRoundLanding with its associated Round
     * @throws FirstRoundLandingNotFoundException if the FirstRoundLanding is not found
     */
    getFirstRoundLanding(ip, round_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstRoundLanding = yield this.firstLandingRepository.findOneWithRound({ ip, round_id });
            if (!firstRoundLanding)
                throw new FirstRoundLandingNotFoundException_1.default();
            return firstRoundLanding;
        });
    }
    /**
     * Finds a Round by its id. If it doesn't exist, throws a RoundNotFoundException.
     * @param round_id id of the Round to find
     * @returns the found Round
     * @throws RoundNotFoundException if the Round is not found
     */
    getRound(round_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const round = yield this.nftRoundRepository.findById(round_id);
            if (!round)
                throw new RoundNotFoundException_1.default();
            return round;
        });
    }
}
exports.default = NftOrderService;
