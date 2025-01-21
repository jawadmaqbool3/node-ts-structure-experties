import { prepareAdminOTPEmailOptions } from "../utils/email-options.utils";
import Mailer from "./Mailer";


export default class Email extends Mailer {

    constructor(email: string) {
        super(email);
    }

    public async sendAdminOTPEmail(otp: number): Promise<void> {
        const mailOptions = prepareAdminOTPEmailOptions(this.email, otp);
        return this.send(mailOptions);
    }

    

}
