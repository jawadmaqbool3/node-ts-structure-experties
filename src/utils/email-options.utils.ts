import { ADMIN_OTP_EMAIL } from "../constants/email.contant";
import { render } from "./html.utils";


export function prepareAdminOTPEmailOptions(email: string, otp: number) {
    return {
        ...ADMIN_OTP_EMAIL,
        to: email,
        html: render(ADMIN_OTP_EMAIL.template, { otp }),
    };
}

