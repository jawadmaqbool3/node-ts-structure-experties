import { OTP_EXPIRATION_TIME_IN_MINUTES } from "../constants/auth.constant";
import InvalidOtpProvidedException from "../exceptions/otp/InvalidOtpProvidedException";
import OTPExpiredException from "../exceptions/otp/OTPExpiredException";
import { IAdmin } from "../interfaces/models/admin.interface";
import { calculateDurationTillNowInSeconds, convertMinutesToSeconds } from "./time";

/**
 * Validates the given OTP against the admin's OTP. If the OTP is invalid or
 * has expired, it throws an exception. This function does not return anything.
 *
 * @param {IAdmin} model - The admin object containing the OTP to be verified.
 * @param {number} otp - The one-time password to be verified.
 *
 * @throws {InvalidOtpProvidedException} If the provided OTP does not match the admin's OTP.
 * @throws {OTPExpiredException} If the admin's OTP has expired.
 */
export function validateOrThrowOTP(model: IAdmin, otp: number) {
    if(model.email_otp_code !== otp)  throw new InvalidOtpProvidedException();
    const timeConsumed: number  = calculateDurationTillNowInSeconds(model.otp_generated_at);
    const otpExpiredInSeconds = convertMinutesToSeconds(OTP_EXPIRATION_TIME_IN_MINUTES);
    if(otpExpiredInSeconds < timeConsumed) throw new OTPExpiredException();
}