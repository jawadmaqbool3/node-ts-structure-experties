import Controller from "../Controller";
import { Response, NextFunction } from "express";
import { IExtendedCustomerRequest } from "../../interfaces/request.interface";
import AuthService from "../../services/AuthService";
import { TAuthRequest } from "../../types/auth.type";


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
            return this.prepareSuccess(res, tokens);
        } catch (error) {
            next(error);
        }
    }
}

