import { convertDaysToSeconds } from "../utils/time";

export const ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS = convertDaysToSeconds(1);
export const REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS = convertDaysToSeconds(7);