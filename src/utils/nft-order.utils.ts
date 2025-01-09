import { PERCENTAGE_DIVISOR } from "../constants/numbers.constant";
import { SECONDS_IN_DAY, SECONDS_IN_HOUR } from "../constants/time.constant";
import NotEnoughQuantityAvailableException from "../exceptions/nft-order/NotEnoughQuantityAvailableException";
import OrderAmountValidationFailedException from "../exceptions/nft-order/OrderAmountValidationFailedException";
import RoundEndedException from "../exceptions/nft-round/RoundEndedException";
import { INftRoundValue } from "../interfaces/models/nft-round-value.interface";
import { TNftApplicableDiscountQuantity, TNftAvailableQuantity, TNftDiscountAmounts } from "../types/nft-order.type";

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
export function validateAvailableQuantity(
    roundValue: INftRoundValue,
    unitsRequired: number,
    isDiscountApplicable: boolean,
    isTrunkHolder: boolean
): TNftApplicableDiscountQuantity {



    const {
        availableTrunkHoldersQuantity,
        availableFastQuantity,
        availableRetailQuantity
    } = calculateAvailableQuantity(roundValue);


    if ((availableFastQuantity + availableRetailQuantity) < unitsRequired) throw new NotEnoughQuantityAvailableException();

    let applicableFastDiscountUnits: number = 0,
        applicableTrunkDiscountUnits: number = 0,
        applicableRetailUnits: number = 0;

    if (isDiscountApplicable) if (availableFastQuantity > unitsRequired) applicableFastDiscountUnits = unitsRequired;
    else applicableFastDiscountUnits = availableFastQuantity;

    if (isTrunkHolder)
        if (availableTrunkHoldersQuantity > unitsRequired) applicableTrunkDiscountUnits = unitsRequired;
        else applicableTrunkDiscountUnits = availableTrunkHoldersQuantity;

    applicableRetailUnits = unitsRequired - applicableFastDiscountUnits;

    return {
        applicableFastDiscountUnits,
        applicableTrunkDiscountUnits,
        applicableRetailUnits
    }
}

/**
 * Calculates the available quantity of trunk holders, fast discount and retail units
 * from the given RoundValue.
 * @param roundValue - The RoundValue to calculate the available quantities from.
 * @returns an object with availableTrunkHoldersQuantity, availableFastQuantity and availableRetailQuantity
 */
export function calculateAvailableQuantity(roundValue: INftRoundValue): TNftAvailableQuantity {
    const availableTrunkHoldersQuantity: number = roundValue.trunk_quantity_total - roundValue.trunk_quantity_sold
    const availableFastQuantity: number = roundValue.fast_discount_quantity_total - roundValue.fast_discount_quantity_sold
    const availableRetailQuantity: number = roundValue.retail_quantity_total - roundValue.retail_quantity_sold

    return {
        availableTrunkHoldersQuantity,
        availableFastQuantity,
        availableRetailQuantity
    }
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
export function calculateValidatedDiscountAmounts(
    roundValue: INftRoundValue,
    unitsRequired: number,
    applicableTrunkDiscountUnits: number,
    applicableFastDiscountUnits: number
): TNftDiscountAmounts {
    const netAmount: number = roundValue.retail_price * unitsRequired;
    const fastDiscountAmountPerUnit: number = (roundValue.retail_price / PERCENTAGE_DIVISOR) * roundValue.fast_discount_percentage
    const trunkDiscountAmountPerUnit: number = ((netAmount - fastDiscountAmountPerUnit) / PERCENTAGE_DIVISOR) * roundValue.trunk_discount_percentage
    const trunkHolderDiscountAmount: number = trunkDiscountAmountPerUnit * applicableTrunkDiscountUnits;
    const fastDiscountAmount: number = fastDiscountAmountPerUnit * applicableFastDiscountUnits;
    const totalAmount: number = netAmount - (trunkHolderDiscountAmount + fastDiscountAmount);

    if (totalAmount != unitsRequired) throw new OrderAmountValidationFailedException();

    return {
        trunkHolderDiscountAmount,
        fastDiscountAmount
    }

}


/**
 * Ensures that the given round is still active based on the given duration and consumed time.
 * If the round has ended, throws a RoundEndedException.
 * @param {number} timeConsumed - The time consumed since the round started in seconds.
 * @param {number} durationDays - The duration of the round in days.
 * @throws {RoundEndedException} - If the round has ended.
 */
export function ensureRoundIsActive(timeConsumed: number, durationDays: number): void {
    const roundDuration = durationDays * SECONDS_IN_DAY;
    if (timeConsumed > roundDuration) throw new RoundEndedException();
}

/**
 * Determines if the fast discount is still applicable based on the given time consumed and discount duration.
 * @param {number} timeConsumed - The time consumed since the round started in seconds.
 * @param {number} fastDiscountDurationHours - The duration of the fast discount in hours.
 * @returns {boolean} - True if the fast discount is still applicable, false otherwise.
 */
export function isFastDiscountApplicable(timeConsumed: number, fastDiscountDurationHours: number): boolean {
    return timeConsumed < fastDiscountDurationHours * SECONDS_IN_HOUR;
}