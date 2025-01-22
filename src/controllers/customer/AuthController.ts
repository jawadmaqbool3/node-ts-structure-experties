import Controller from "../Controller";
import { Response, NextFunction } from "express";
import { IExtendedCustomerRequest } from "../../interfaces/request.interface";
import AuthService from "../../services/AuthService";
import { TAuthRequest } from "../../types/auth.type";


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
     * @param {IExtendedCustomerRequest} req - The request object with the admin user credentials.
     * @param {Response} res - The response object to send a success message.
     * @param {NextFunction} next - The next function to pass the error to if authentication fails.
     *
     * @returns {Promise<void>}
     */
    public async login(req: IExtendedCustomerRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const authRequest: TAuthRequest = req.body;
            const tokens = await this.authService.customerLogin(authRequest);
            return this.prepareSuccess(res, tokens);
        } catch (error) {
            next(error);
        }
    }
}

