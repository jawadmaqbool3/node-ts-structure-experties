"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAvailableQuantity = validateAvailableQuantity;
exports.calculateAvailableQuantity = calculateAvailableQuantity;
exports.calculateValidatedDiscountAmounts = calculateValidatedDiscountAmounts;
exports.ensureRoundIsActive = ensureRoundIsActive;
exports.isFastDiscountApplicable = isFastDiscountApplicable;
const numbers_constant_1 = require("../constants/numbers.constant");
const time_constant_1 = require("../constants/time.constant");
const NotEnoughQuantityAvailableException_1 = __importDefault(require("../exceptions/nft-order/NotEnoughQuantityAvailableException"));
const OrderAmountValidationFailedException_1 = __importDefault(require("../exceptions/nft-order/OrderAmountValidationFailedException"));
const RoundEndedException_1 = __importDefault(require("../exceptions/nft-round/RoundEndedException"));
/**
 * Validates and calculates the applicable discount quantities for an NFT order.
 *
 * This function checks the available quantities of trunk holder, fast discount,
 * and retail units for a given round value and determines how many units can
 * be applied for each category based on the order requirements and eligibility.
 *
 * @param {INftRoundValue} roundValue - The round value containing available quantities.
 * @param {number} unitsRequired - The total number of units required for the order.
 * @param {boolean} isDiscountApplicable - Indicates if the fast discount is applicable.
 * @param {boolean} isTrunkHolder - Indicates if the purchaser is a trunk holder.
 *
 * @returns {TNftApplicableDiscountQuantity} - An object containing the calculated
 * quantities for applicable trunk discount, fast discount, and retail units.
 *
 * @throws {NotEnoughQuantityAvailableException} - If the combined fast and retail
 * quantities are less than the units required.
 */
function validateAvailableQuantity(roundValue, unitsRequired, isDiscountApplicable, isTrunkHolder) {
    const { availableTrunkHoldersQuantity, availableFastQuantity, availableRetailQuantity } = calculateAvailableQuantity(roundValue);
    if ((availableFastQuantity + availableRetailQuantity) < unitsRequired)
        throw new NotEnoughQuantityAvailableException_1.default();
    let applicableFastDiscountUnits = 0, applicableTrunkDiscountUnits = 0, applicableRetailUnits = 0;
    if (isDiscountApplicable)
        if (availableFastQuantity > unitsRequired)
            applicableFastDiscountUnits = unitsRequired;
        else
            applicableFastDiscountUnits = availableFastQuantity;
    if (isTrunkHolder)
        if (availableTrunkHoldersQuantity > unitsRequired)
            applicableTrunkDiscountUnits = unitsRequired;
        else
            applicableTrunkDiscountUnits = availableTrunkHoldersQuantity;
    applicableRetailUnits = unitsRequired - applicableFastDiscountUnits;
    return {
        applicableFastDiscountUnits,
        applicableTrunkDiscountUnits,
        applicableRetailUnits
    };
}
/**
 * Calculates the available quantity of trunk holders, fast discount and retail units
 * from the given RoundValue.
 * @param roundValue - The RoundValue to calculate the available quantities from.
 * @returns an object with availableTrunkHoldersQuantity, availableFastQuantity and availableRetailQuantity
 */
function calculateAvailableQuantity(roundValue) {
    const availableTrunkHoldersQuantity = roundValue.trunk_quantity_total - roundValue.trunk_quantity_sold;
    const availableFastQuantity = roundValue.fast_discount_quantity_total - roundValue.fast_discount_quantity_sold;
    const availableRetailQuantity = roundValue.retail_quantity_total - roundValue.retail_quantity_sold;
    return {
        availableTrunkHoldersQuantity,
        availableFastQuantity,
        availableRetailQuantity
    };
}
/**
 * Calculates the applicable trunk holder and fast discount amounts for an NFT order.
 *
 * This function takes the round value, required units, and applicable quantities of trunk holder and fast discount units
 * and calculates the total discount amounts for each category. It then checks if the total calculated amount
 * equals the units required and throws an exception if it does not.
 *
 * @param {INftRoundValue} roundValue - The round value containing the retail price and discount percentages.
 * @param {number} unitsRequired - The total number of units required for the order.
 * @param {number} applicableTrunkDiscountUnits - The applicable trunk holder discount units.
 * @param {number} applicableFastDiscountUnits - The applicable fast discount units.
 *
 * @returns {TNftDiscountAmounts} - An object containing the calculated trunk holder and fast discount amounts.
 *
 * @throws {OrderAmountValidationFailedException} - If the total calculated amount does not equal the units required.
 */
function calculateValidatedDiscountAmounts(roundValue, unitsRequired, totalPrice, applicableTrunkDiscountUnits, applicableFastDiscountUnits) {
    const netAmount = roundValue.retail_price * unitsRequired;
    const fastDiscountAmountPerUnit = (roundValue.retail_price / numbers_constant_1.PERCENTAGE_DIVISOR) * roundValue.fast_discount_percentage;
    const trunkDiscountAmountPerUnit = ((netAmount - fastDiscountAmountPerUnit) / numbers_constant_1.PERCENTAGE_DIVISOR) * roundValue.trunk_discount_percentage;
    const trunkHolderDiscountAmount = trunkDiscountAmountPerUnit * applicableTrunkDiscountUnits;
    const fastDiscountAmount = fastDiscountAmountPerUnit * applicableFastDiscountUnits;
    const totalAmount = netAmount - (trunkHolderDiscountAmount + fastDiscountAmount);
    if (totalAmount != totalPrice)
        throw new OrderAmountValidationFailedException_1.default();
    return {
        trunkHolderDiscountAmount,
        fastDiscountAmount
    };
}
/**
 * Ensures that the given round is still active based on the given duration and consumed time.
 * If the round has ended, throws a RoundEndedException.
 * @param {number} timeConsumed - The time consumed since the round started in seconds.
 * @param {number} durationDays - The duration of the round in days.
 * @throws {RoundEndedException} - If the round has ended.
 */
function ensureRoundIsActive(timeConsumed, durationDays) {
    const roundDuration = durationDays * time_constant_1.SECONDS_IN_DAY;
    if (timeConsumed > roundDuration)
        throw new RoundEndedException_1.default();
}
/**
 * Determines if the fast discount is still applicable based on the given time consumed and discount duration.
 * @param {number} timeConsumed - The time consumed since the round started in seconds.
 * @param {number} fastDiscountDurationHours - The duration of the fast discount in hours.
 * @returns {boolean} - True if the fast discount is still applicable, false otherwise.
 */
function isFastDiscountApplicable(timeConsumed, fastDiscountDurationHours) {
    return timeConsumed < fastDiscountDurationHours * time_constant_1.SECONDS_IN_HOUR;
}
