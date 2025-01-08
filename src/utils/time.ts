export function calculateDurationTillNowInSeconds(initialTime: Date): number {
    let timeConsumed = Date.now() -  initialTime.getTime();
    timeConsumed = Math.floor(timeConsumed / 1000)
    return timeConsumed;
}