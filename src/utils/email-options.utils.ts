import { OTP_EXPIRATION_TIME_IN_MINUTES } from "../constants/auth.constant";
import { CUSTOMER_REGISTRATION_EMAIL, OTP_EMAIL } from "../constants/email.contant";
import { IAdmin } from "../interfaces/models/admin.interface";
import { ICustomer } from "../interfaces/models/customer.interface";
import { render } from "./html.utils";


/**
 * Prepares the email options for sending an OTP to an admin.
 *
 * @param {IAdmin} admin - The admin object containing the email address to send the OTP to.
 * @param {number} otp - The one-time password to be included in the email.
 * @returns {object} The email options including the recipient's email, HTML content,
 * and additional email metadata.
 */

export function prepareAdminOTPEmailOptions(admin: IAdmin, otp: number): object {
    const {
        subject,
        template,
    } = OTP_EMAIL;
    return {
        ...OTP_EMAIL,
        to: admin.email,
        html: render(template, {
            otp,
            subject,
            otp_expiration: OTP_EXPIRATION_TIME_IN_MINUTES,
            user_name: admin.first_name.toLocaleUpperCase()
        }),
    };
}



/**
 * Prepares the email options for sending registration confirmation email to a customer.
 *
 * @param {ICustomer} customer - The customer object containing the email address to send the email to.
 * @returns {object} The email options including the recipient's email, HTML content, and additional email metadata.
 */
export function prepareCustomerRegistrationEmailOptions(customer: ICustomer): object {

    const {
        subject,
        template,
    } = CUSTOMER_REGISTRATION_EMAIL;

    return {
        ...CUSTOMER_REGISTRATION_EMAIL,
        to: customer.email,
        html: render(template, {
            email: customer.email,
            subject,
            password: customer.password,
            user_name: customer.first_name.toLocaleUpperCase()
        }),
    };
}


