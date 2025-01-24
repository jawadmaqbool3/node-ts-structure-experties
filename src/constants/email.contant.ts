const logo = {
    filename: 'logo.png',
    path: __dirname + '/../static-files/logo.png',
    cid: 'logo-image-id',
}
const from = `Team Utherverse <noreply@nexusecosystem.io>`
const lookupTemplate = (fileName: string) => __dirname + '/../static-files/templates/' + fileName
const OTP_EMAIL_TEMPLATE = lookupTemplate("otp-email-template/index.html"),
    CUSTOMER_REGISTRATION_EMAIL_TEMPLATE = lookupTemplate("customer-registration-email-template/index.html");


export const OTP_EMAIL = {
    from,
    subject: "OTP Verification",
    template: OTP_EMAIL_TEMPLATE,
    attachments: [
        logo
    ],
}


export const CUSTOMER_REGISTRATION_EMAIL = {
    from,
    subject: "Registration Confirmation",
    template: CUSTOMER_REGISTRATION_EMAIL_TEMPLATE,
    attachments: [
        logo
    ],
}