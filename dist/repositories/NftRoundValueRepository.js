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
const nft_round_value_model_1 = __importDefault(require("../database/models/nft-round-value.model"));
const Repository_1 = __importDefault(require("./Repository"));
const RoundValuesNotFoundException_1 = __importDefault(require("../exceptions/round-values/RoundValuesNotFoundException"));
class NftRoundValueRepository extends Repository_1.default {
    /**
     * Initializes a new instance of the NftRoundValueRepository class.
     * Calls the superclass constructor with the NftRoundValue model.
     */
    constructor() {
        super(nft_round_value_model_1.default);
    }
    /**
     * Decrements the trunk, fast discount and retail quantity sold from the RoundValue with the given id
     * by the given applicable units. Returns the updated RoundValue.
     * @param round_values_id id of the RoundValue to update
     * @param units object with applicableTrunkDiscountUnits, applicableFastDiscountUnits and applicableRetailUnits
     * @returns the updated RoundValue, or null if the RoundValue was not found
     */
    decrementUnits(round_values_id, units) {
        const { applicableFastDiscountUnits, applicableTrunkDiscountUnits, applicableRetailUnits } = units;
        return this.model.findOneAndUpdate({ _id: round_values_id }, {
            $inc: {
                trunk_quantity_sold: -applicableTrunkDiscountUnits,
                fast_discount_quantity_sold: -applicableFastDiscountUnits,
                retail_quantity_sold: -applicableRetailUnits
            }
        }, { new: true }).exec();
    }
    /**
     * Finds a RoundValue by its id. If it doesn't exist, throws a RoundValuesNotFoundException.
     * @param round_values_id id of the RoundValue to find
     * @returns the found RoundValue
     * @throws RoundValuesNotFoundException if the RoundValue is not found
     */
    getValidated(round_values_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const roundValues = yield this.findById(round_values_id);
            if (!roundValues)
                throw new RoundValuesNotFoundException_1.default();
            return roundValues;
        });
    }
}
exports.default = NftRoundValueRepository;
