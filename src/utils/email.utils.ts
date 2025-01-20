import nodemailer from "nodemailer";
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from "../constants/env.constant";

export function sendAdminOTPEmail(email: string, otp: number) {
    return new Promise(async (resolve, reject) => {
        const transporter = getTransporter();
        const mailOptions = {
            from: `Team Utherverse <noreply@nexusecosystem.io>`,
            to: email,
            subject: "OTP Verification",
            html: "<p><strong>Your OTP Verification Code </strong></p>" + otp,
        };
        await transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('check error', err);
                console.log('checkout info===============>', info);
                reject(err);
            } else {
                // console.log("Email sent: " + info.response);
                // console.log("info==========>: " + info);
                resolve("ok");
            }
        });
    });
}


function getTransporter() {
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
    });
    return transporter;
}