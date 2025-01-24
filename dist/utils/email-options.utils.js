"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareAdminOTPEmailOptions = prepareAdminOTPEmailOptions;
exports.prepareCustomerRegistrationEmailOptions = prepareCustomerRegistrationEmailOptions;
const auth_constant_1 = require("../constants/auth.constant");
const email_contant_1 = require("../constants/email.contant");
const html_utils_1 = require("./html.utils");
/**
 * Prepares the email options for sending an OTP to an admin.
 *
 * @param {IAdmin} admin - The admin object containing the email address to send the OTP to.
 * @param {number} otp - The one-time password to be included in the email.
 * @returns {object} The email options including the recipient's email, HTML content,
 * and additional email metadata.
 */
function prepareAdminOTPEmailOptions(admin, otp) {
    const { subject, template, } = email_contant_1.OTP_EMAIL;
    return Object.assign(Object.assign({}, email_contant_1.OTP_EMAIL), { to: admin.email, html: (0, html_utils_1.render)(template, {
            otp,
            subject,
            otp_expiration: auth_constant_1.OTP_EXPIRATION_TIME_IN_MINUTES,
            user_name: admin.first_name.toLocaleUpperCase()
        }) });
}
/**
 * Prepares the email options for sending registration confirmation email to a customer.
 *
 * @param {ICustomer} customer - The customer object containing the email address to send the email to.
 * @returns {object} The email options including the recipient's email, HTML content, and additional email metadata.
 */
function prepareCustomerRegistrationEmailOptions(customer) {
    const { subject, template, } = email_contant_1.CUSTOMER_REGISTRATION_EMAIL;
    return Object.assign(Object.assign({}, email_contant_1.CUSTOMER_REGISTRATION_EMAIL), { to: customer.email, html: (0, html_utils_1.render)(template, {
            email: customer.email,
            subject,
            password: customer.password,
            user_name: customer.first_name.toLocaleUpperCase()
        }) });
}
