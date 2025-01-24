"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePercentage = calculatePercentage;
const numbers_constant_1 = require("../constants/numbers.constant");
/**
 * Calculates a percentage of a given amount.
 *
 * @param {number} amount - The amount to calculate the percentage of.
 * @param {number} percentage - The percentage to calculate.
 *
 * @returns {number} The calculated percentage of the given amount.
 */
function calculatePercentage(amount, percentage) {
    return (amount * percentage) / numbers_constant_1.PERCENTAGE_DIVISOR;
}
