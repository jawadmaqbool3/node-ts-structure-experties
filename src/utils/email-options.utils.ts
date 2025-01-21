import { OTP_EXPIRATION_TIME_IN_MINUTES } from "../constants/auth.constant";
import { OTP_EMAIL } from "../constants/email.contant";
import { IAdmin } from "../interfaces/models/admin.interface";
import { render } from "./html.utils";


export function prepareAdminOTPEmailOptions(admin: IAdmin, otp: number) {
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

