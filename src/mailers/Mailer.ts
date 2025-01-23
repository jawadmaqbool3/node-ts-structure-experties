import nodemailer, { Transporter } from "nodemailer";
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from "../constants/env.constant";
import Mail from "nodemailer/lib/mailer";


export default class Mailer {
    private static transporter: Transporter;

    /**
     * Creates an instance of the Mailer class.
     *
     * @remarks
     * If the transporter property is not already set, it will be set up using the
     * values from the environment variables. This is done to ensure that the
     * transporter is only set up once, and to prevent having to set it up
     * every time a new instance of the Mailer class is created.
     */
    constructor(
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

    /**
     * Sends an email using the transporter.
     *
     * @param mailOptions The mail options to use when sending the email.
     *
     * @returns A promise that resolves when the email has been sent.
     */
    protected async send(mailOptions: Mail.Options): Promise<void> {
        return Mailer.transporter.sendMail(mailOptions);
    }





}
