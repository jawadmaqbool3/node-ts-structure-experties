
import AuthMailer from "../Emails/AuthMailer";

export async function sendAdminOTPEmail(email: string, otp: number) {
    const emailService = new AuthMailer(email);
    await emailService.sendAdminOTPEmail(otp);
}