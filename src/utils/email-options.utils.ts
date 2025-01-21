import { OTP_EXPIRATION_TIME_IN_MINUTES } from "../constants/auth.constant";
import { OTP_EMAIL } from "../constants/email.contant";
import { IAdmin } from "../interfaces/models/admin.interface";
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
    return {
        ...OTP_EMAIL,
        to: admin.email,
        html: render(OTP_EMAIL.template, { 
            otp, 
            otp_expiration: OTP_EXPIRATION_TIME_IN_MINUTES,
            user_name: admin.first_name.toLocaleUpperCase()
         }),
    };
}

