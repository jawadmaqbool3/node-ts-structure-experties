import { PERCENTAGE_DIVISOR } from "../constants/numbers.constant";

export function calculatePercentage(amount: number, percentage: number): number {
    return (amount * percentage) / PERCENTAGE_DIVISOR;
}