"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDurationTillNowInSeconds = calculateDurationTillNowInSeconds;
/**
 * Calculate the duration in seconds since a given initial time until now.
 *
 * @param {Date} initialTime - The initial time to calculate the duration from.
 * @returns {number} The duration in seconds until now.
 */
function calculateDurationTillNowInSeconds(initialTime) {
    let timeConsumed = Date.now() - initialTime.getTime();
    timeConsumed = Math.floor(timeConsumed / 1000);
    return timeConsumed;
}
