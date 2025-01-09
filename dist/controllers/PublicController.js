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
const Controller_1 = __importDefault(require("./Controller"));
const SalesPageService_1 = __importDefault(require("../services/SalesPageService"));
const NftOrderService_1 = __importDefault(require("../services/NftOrderService"));
const TrunkHolderService_1 = __importDefault(require("../services/TrunkHolderService"));
const RoundValuesService_1 = __importDefault(require("../services/RoundValuesService"));
class PublicController extends Controller_1.default {
    /**
     * Constructor
     *
     * @param {SalesPageService} salesPageService - sales page service
     * @param {NftOrderService} nftOrderService - nft order service
     * @param {TrunkHolderService} trunkHolderService - trunk holder service
     * @param {RoundValuesService} roundValueService - round value service
     */
    constructor(salesPageService = new SalesPageService_1.default(), nftOrderService = new NftOrderService_1.default(), trunkHolderService = new TrunkHolderService_1.default(), roundValueService = new RoundValuesService_1.default()) {
        super();
        this.salesPageService = salesPageService;
        this.nftOrderService = nftOrderService;
        this.trunkHolderService = trunkHolderService;
        this.roundValueService = roundValueService;
    }
    /**
     * Get initial sales page parameters
     *
     * @param {IIPCheckedRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    getInitialSalesPageParams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = req.checkedIp ? yield this.salesPageService.prepareInitialSalesPageParams(req.checkedIp) : [];
            return this.returnSuccess(res, { params });
        });
    }
    /**
     * Place order
     *
     * @param {IIPCheckedRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    placeOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderParams = Object.assign({ ip: req.checkedIp }, req.body);
            const order = req.checkedIp ? yield this.nftOrderService.placeOrder(orderParams) : null;
            return this.returnSuccess(res, { order });
        });
    }
    /**
     * Check if given wallet address is a trunk holder
     *
     * @param {IIPCheckedRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    checkTrunkHolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet_address = req.body.wallet_address;
            const isTrunkHolder = yield this.trunkHolderService.isTrunkHolder(wallet_address);
            return this.returnSuccess(res, { isTrunkHolder });
        });
    }
    /**
     * Get round values
     *
     * @param {IIPCheckedRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    getNftRoundValues(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = Object.assign({}, req.body);
            const roundValues = yield this.roundValueService.getRoundValues(queryParams);
            return this.returnSuccess(res, { roundValues });
        });
    }
}
exports.default = PublicController;
