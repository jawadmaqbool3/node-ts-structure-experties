"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nft_round_value_model_1 = __importDefault(require("../models/nft-round-value.model"));
const Repository_1 = __importDefault(require("./Repository"));
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
}
exports.default = NftRoundValueRepository;
