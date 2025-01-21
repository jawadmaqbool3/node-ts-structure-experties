import { PERCENTAGE_DIVISOR } from "../constants/numbers.constant";

/**
 * Calculates a percentage of a given amount.
 *
 * @param {number} amount - The amount to calculate the percentage of.
 * @param {number} percentage - The percentage to calculate.
 *
 * @returns {number} The calculated percentage of the given amount.
 */
export function calculatePercentage(amount: number, percentage: number): number {
    return (amount * percentage) / PERCENTAGE_DIVISOR;
}