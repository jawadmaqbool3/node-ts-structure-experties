import Controller from "../Controller";
import { Response, NextFunction } from "express";
import { IExtendedCustomerRequest } from "../../interfaces/request.interface";
import AuthService from "../../services/AuthService";
import { TAuthRequest } from "../../types/auth.type";
import { OTP_IS_SENT_TO_EMAIL } from "../../messages/request-success.messages";


export default class AuthController extends Controller {

    constructor(
        private authService = new AuthService(),
    ) {
        super();
    }


    public async login(req: IExtendedCustomerRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const credentials: TAuthRequest = req.body;
            const tokens = await this.authService.authenticateAdminAndSendEmailOtp(credentials);
            return this.prepareSuccess(res, {
                message: OTP_IS_SENT_TO_EMAIL,
                ...tokens
            });
        } catch (error) {
            next(error);
        }
    }
}

