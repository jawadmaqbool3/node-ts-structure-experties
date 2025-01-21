
import AuthMailer from "../mailers/AuthMailer";
import { IAdmin } from "../interfaces/models/admin.interface";

/**
 * Sends an OTP email to the specified admin.
 *
 * @param {IAdmin} admin - The admin object containing the email address to send the OTP to.
 * @param {number} otp - The one-time password to be included in the email.
 * @returns {Promise<void>} A promise that resolves when the email has been sent.
 */
export async function sendAdminOTPEmail(admin: IAdmin, otp: number): Promise<void> {
    const emailService = new AuthMailer(admin.email);
    await emailService.sendAdminOTPEmail(admin, otp);
}