import nodemailer, { Transporter } from "nodemailer";
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from "../constants/env.constant";
import { prepareAdminOTPEmailOptions } from "../utils/email-options.utils";
import Mail from "nodemailer/lib/mailer";


export default class Mailer {
    private static transporter: Transporter;

    constructor(
        protected email: string
    ) {
        if (!Mailer.transporter) {
            Mailer.transporter = nodemailer.createTransport({
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

    protected async send(mailOptions: Mail.Options): Promise<void> {
        return Mailer.transporter.sendMail(mailOptions);
    }

   



}
