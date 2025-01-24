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
const OrderNotFoundException_1 = __importDefault(require("../exceptions/nft-order/OrderNotFoundException"));
const nft_order_model_1 = __importDefault(require("../database/models/nft-order.model"));
const mongoos_utils_1 = require("../utils/mongoos.utils");
const Repository_1 = __importDefault(require("./Repository"));
class NftOrderRepository extends Repository_1.default {
    /**
     * Constructs an instance of NftOrderRepository by calling the base Repository class
     * with the NftOrder model, facilitating database operations on NFT orders.
     */
    constructor() {
        super(nft_order_model_1.default);
    }
    /**
     * Validates whether an NFT order exists in the database.
     * @param _id The MongoDB ObjectId or string _id of the order to validate.
     * @throws OrderNotFoundException if the order does not exist.
     */
    validate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.isExists({ _id: (0, mongoos_utils_1.toObjectId)(_id) });
            if (!order)
                throw new OrderNotFoundException_1.default();
        });
    }
    /**
     * Retrieves an NFT order by its _id after validating that it exists.
     * @param order_id The MongoDB ObjectId or string _id of the order to retrieve.
     * @returns The found NFT order.
     * @throws OrderNotFoundException if the order does not exist.
     */
    getValidated(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.findById(order_id);
            if (!order)
                throw new OrderNotFoundException_1.default();
            return order;
        });
    }
}
exports.default = NftOrderRepository;
