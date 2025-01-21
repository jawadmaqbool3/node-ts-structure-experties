import { IAdmin } from "../interfaces/models/admin.interface";
import { prepareAdminOTPEmailOptions } from "../utils/email-options.utils";
import Mailer from "./Mailer";


export default class Email extends Mailer {

    /**
     * Constructor for Email
     *
     * @param email The email address to send emails to
     */
    constructor(email: string) {
        super(email);
    }

    public async sendAdminOTPEmail(admin: IAdmin, otp: number): Promise<void> {
        const mailOptions = prepareAdminOTPEmailOptions(admin, otp);
        /**
         * Sends an OTP email to the specified admin.
         *
         * @param {IAdmin} admin - The admin object containing the email address to send the OTP to.
         * @param {number} otp - The one-time password to be included in the email.
         * @returns {Promise<void>} A promise that resolves when the email has been sent.
         */

        return this.send(mailOptions);
    }



}
