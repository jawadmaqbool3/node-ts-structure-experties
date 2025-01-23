import { IAdmin } from "../interfaces/models/admin.interface";
import { ICustomer } from "../interfaces/models/customer.interface";
import { prepareAdminOTPEmailOptions, prepareCustomerRegistrationEmailOptions } from "../utils/email-options.utils";
import Mailer from "./Mailer";


export default class Email extends Mailer {

    /**
     * Constructor for Email
     *
     * @param email The email address to send emails to
     */
    constructor() {
        super();
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


    /**
     * Sends a registration email to the specified customer.
     *
     * @param {ICustomer} customer - The customer object containing the email address to send the registration email to.
     * @returns {Promise<void>} A promise that resolves when the email has been sent.
     */

    public async sendRegistrationEmail(customer: ICustomer): Promise<void> {
        const mailOptions = prepareCustomerRegistrationEmailOptions(customer);
        return this.send(mailOptions);
    }



}
