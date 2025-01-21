import { OTP_EXPIRATION_TIME_IN_MINUTES } from "../constants/auth.constant";
import InvalidOtpProvidedException from "../exceptions/otp/InvalidOtpProvidedException";
import OTPExpiredException from "../exceptions/otp/OTPExpiredException";
import { IAdmin } from "../interfaces/models/admin.interface";
import { calculateDurationTillNowInSeconds, convertMinutesToSeconds } from "./time";

export function validateOrThrowOTP(model: IAdmin, otp: number) {
    if(model.email_otp_code !== otp)  throw new InvalidOtpProvidedException();
    const timeConsumed: number  = calculateDurationTillNowInSeconds(model.otp_generated_at);
    const otpExpiredInSeconds = convertMinutesToSeconds(OTP_EXPIRATION_TIME_IN_MINUTES);
    if(otpExpiredInSeconds < timeConsumed) throw new OTPExpiredException();
}