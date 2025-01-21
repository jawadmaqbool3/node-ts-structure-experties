export const OTP_EMAIL = {
    from: `Team Utherverse <noreply@nexusecosystem.io>`,
    subject: "OTP Verification",
    template: __dirname + "\\..\\static-files\\templates\\otp-email-template\\index.html",
    attachments: [
        {
            filename: 'logo.png', 
            path: __dirname + '\\..\\static-files\\logo.png',
            cid: 'logo-image-id', 
        },
    ],
}