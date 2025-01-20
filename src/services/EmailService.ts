import Service from "./Service";
import nodemailer, { Transporter } from "nodemailer";
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from "../constants/env.constant";
import { prepareAdminOTPEmailOptions } from "../utils/email-options.utils";


export default class EmailService extends Service {
    private static transporter: Transporter;
    constructor(
    ) {
        super();
        if (!EmailService.transporter) {
            EmailService.transporter = nodemailer.createTransport({
                host: EMAIL_HOST,
                port: EMAIL_PORT,
                secure: true, 
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PASSWORD,
                },
            });
        }
    }

    public async sendAdminOTPEmail(email: string, otp: number): Promise<void> {
        const mailOptions = prepareAdminOTPEmailOptions(email, otp);
        return EmailService.transporter.sendMail(mailOptions);
    }

}
