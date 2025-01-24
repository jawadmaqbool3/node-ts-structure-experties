"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrThrowOTP = validateOrThrowOTP;
const auth_constant_1 = require("../constants/auth.constant");
const InvalidOtpProvidedException_1 = __importDefault(require("../exceptions/otp/InvalidOtpProvidedException"));
const OTPExpiredException_1 = __importDefault(require("../exceptions/otp/OTPExpiredException"));
const time_1 = require("./time");
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
function validateOrThrowOTP(model, otp) {
    if (model.email_otp_code !== otp)
        throw new InvalidOtpProvidedException_1.default();
    const timeConsumed = (0, time_1.calculateDurationTillNowInSeconds)(model.otp_generated_at);
    const otpExpiredInSeconds = (0, time_1.convertMinutesToSeconds)(auth_constant_1.OTP_EXPIRATION_TIME_IN_MINUTES);
    if (otpExpiredInSeconds < timeConsumed)
        throw new OTPExpiredException_1.default();
}
