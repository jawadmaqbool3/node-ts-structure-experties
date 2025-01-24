"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDurationTillNowInSeconds = calculateDurationTillNowInSeconds;
exports.convertMinutesToSeconds = convertMinutesToSeconds;
exports.convertDaysToSeconds = convertDaysToSeconds;
const time_constant_1 = require("../constants/time.constant");
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
/**
 * Converts the given minutes to seconds.
 *
 * @param {number} minutes - The minutes to convert.
 * @returns {number} The converted minutes in seconds.
 */
function convertMinutesToSeconds(minutes) {
    return minutes * time_constant_1.SECONDS_IN_MINUTE;
}
/**
 * Converts the given number of days to seconds.
 *
 * @param {number} days - The number of days to convert.
 * @returns {number} The equivalent duration in seconds.
 */
function convertDaysToSeconds(days) {
    return days * time_constant_1.SECONDS_IN_DAY;
}
;
