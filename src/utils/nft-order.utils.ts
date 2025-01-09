import { PERCENTAGE_DIVISOR } from "../constants/numbers.constant";
import { SECONDS_IN_DAY, SECONDS_IN_HOUR } from "../constants/time.constant";
import NotEnoughQuantityAvailableException from "../exceptions/nft-order/NotEnoughQuantityAvailableException";
import OrderAmountValidationFailedException from "../exceptions/nft-order/OrderAmountValidationFailedException";
import RoundEndedException from "../exceptions/nft-round/RoundEndedException";
import { INftRoundValue } from "../interfaces/models/nft-round-value.interface";
import { TNftApplicableDiscountQuantity, TNftAvailableQuantity, TNftDiscountAmounts } from "../types/place-order.type";

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


export function ensureRoundIsActive(timeConsumed: number, durationDays: number): void {
    const roundDuration = durationDays * SECONDS_IN_DAY;
    if (timeConsumed > roundDuration) throw new RoundEndedException();
}

export function isFastDiscountApplicable(timeConsumed: number, fastDiscountDurationHours: number): boolean {
    return timeConsumed < fastDiscountDurationHours * SECONDS_IN_HOUR;
}