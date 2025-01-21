import { SECONDS_IN_MINUTE } from "../constants/time.constant";

/**
 * Calculate the duration in seconds since a given initial time until now.
 *
 * @param {Date} initialTime - The initial time to calculate the duration from.
 * @returns {number} The duration in seconds until now.
 */
export function calculateDurationTillNowInSeconds(initialTime: Date): number {
    let timeConsumed = Date.now() -  initialTime.getTime();
    timeConsumed = Math.floor(timeConsumed / 1000)
    return timeConsumed;
}



/**
 * Converts the given minutes to seconds.
 *
 * @param {number} minutes - The minutes to convert.
 * @returns {number} The converted minutes in seconds.
 */
export function convertMinutesToSeconds(minutes: number): number {
    return minutes * SECONDS_IN_MINUTE;
}