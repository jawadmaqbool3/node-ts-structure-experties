
import AuthMailer from "../emails/AuthMailer";
import { IAdmin } from "../interfaces/models/admin.interface";

export async function sendAdminOTPEmail(admin: IAdmin, otp: number): Promise<void> {
    const emailService = new AuthMailer(admin.email);
    await emailService.sendAdminOTPEmail(admin, otp);
}