import { IAdmin } from "../interfaces/models/admin.interface";
import { prepareAdminOTPEmailOptions } from "../utils/email-options.utils";
import Mailer from "./Mailer";


export default class Email extends Mailer {

    constructor(email: string) {
        super(email);
    }

    public async sendAdminOTPEmail(admin: IAdmin, otp: number): Promise<void> {
        const mailOptions = prepareAdminOTPEmailOptions(admin, otp);
        return this.send(mailOptions);
    }

    

}
