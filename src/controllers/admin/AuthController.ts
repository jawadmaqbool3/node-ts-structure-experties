import Controller from "../Controller";
import { Response, NextFunction } from "express";
import { IExtendedAdminRequest } from "../../interfaces/request.interface";
import AuthService from "../../services/AuthService";
import { TAuthRequest, TOTPVerificationRequest } from "../../types/auth.type";
import { OTP_IS_SENT_TO_EMAIL, OTP_VERIFIED_SUCCESSFULLY } from "../../messages/request-success.messages";
import { IAdmin } from "../../interfaces/models/admin.interface";
import { TFA_VERIFIED_SUCCESSFULLY } from "../../messages/exceptions.messages";


export default class AuthController extends Controller {

    /**
     * Constructor for the AuthController.
     *
     * Initializes the AuthController with an instance of AuthService.
     *
     * @param {AuthService} [authService] - An instance of AuthService, defaulting to a new instance.
     */

    constructor(
        private authService = new AuthService(),
    ) {
        super();
    }


    /**
     * Authenticates an admin user and sends an OTP to the user's email address.
     *
     * @param {IExtendedAdminRequest} req - The request object with the admin user credentials.
     * @param {Response} res - The response object to send a success message.
     * @param {NextFunction} next - The next function to pass the error to if authentication fails.
     *
     * @returns {Promise<void>}
     */
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



    /**
     * Verifies the OTP for the given admin user.
     *
     * @param {IExtendedAdminRequest} req - The request object with the admin user's OTP to be verified.
     * @param {Response} res - The response object to send a success message.
     * @param {NextFunction} next - The next function to pass the error to if the verification fails.
     *
     * @returns {Promise<void>}
     */
    public async verifyOtp(req: IExtendedAdminRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const verificationRequest: TOTPVerificationRequest = req.body;
            const admin: IAdmin = req.admin as IAdmin;
            await this.authService.verifyAdminOtp(admin, verificationRequest.otp);
            return this.prepareSuccess(res, {
                message: OTP_VERIFIED_SUCCESSFULLY
            });
        } catch (error) {
            next(error);
        }
    }




    /**
     * Verifies the TFA code for the given admin user.
     *
     * @param {IExtendedAdminRequest} req - The request object containing the admin user and TFA code.
     * @param {Response} res - The response object to send a success message.
     * @param {NextFunction} next - The next function to pass the error to if the verification fails.
     *
     * @returns {Promise<void>}
     */

    public async verifyTfa(req: IExtendedAdminRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const admin: IAdmin = req.admin as IAdmin;
            const { code } = req.body;
            await this.authService.verifyTfa(admin, code);
            return this.prepareSuccess(res, {
                message: TFA_VERIFIED_SUCCESSFULLY,
            });
        } catch (error) {
            next(error);
        }
    }
}