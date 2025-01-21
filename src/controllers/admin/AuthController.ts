import Controller from "../Controller";
import { Response, NextFunction } from "express";
import { IExtendedAdminRequest } from "../../interfaces/request.interface";
import AuthService from "../../services/AuthService";
import { TAuthRequest, TOTPVerificationRequest } from "../../types/auth.type";
import { OTP_IS_SENT_TO_EMAIL, OTP_VERIFIED_SUCCESSFULLY } from "../../messages/request-success.messages";
import AdminNotFoundException from "../../exceptions/middlewares/AdminNotFoundException";
import { IAdmin } from "../../interfaces/models/admin.interface";


export default class AuthController extends Controller {

    constructor(
        private authService = new AuthService(),
    ) {
        super();
    }


    public async login(req: IExtendedAdminRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const authRequest: TAuthRequest = req.body;
            const tokens = await this.authService.authenticateAdminAndSendEmailOtp(authRequest);
            return this.prepareSuccess(res, {
                message: OTP_IS_SENT_TO_EMAIL,
                ...tokens
            });
        } catch (error) {
            next(error);
        }
    }


    public async verifyOtp(req: IExtendedAdminRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const verificationRequest: TOTPVerificationRequest = req.body;
            if (!req.admin) throw new AdminNotFoundException();
            const admin: IAdmin = req.admin;
            await this.authService.verifyAdminOtp(admin, verificationRequest.otp);
            return this.prepareSuccess(res, {
                message: OTP_VERIFIED_SUCCESSFULLY
            });
        } catch (error) {
            next(error);
        }
    }
}

