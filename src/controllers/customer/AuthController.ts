import Controller from "../Controller";
import { Response, NextFunction } from "express";
import { IExtendedCustomerRequest } from "../../interfaces/request.interface";
import AuthService from "../../services/AuthService";
import { TAuthRequest, TCustomRegistrationRequest } from "../../types/auth.type";
import { sendRegistrationEmail } from "../../utils/email.utils";
import { ICustomer } from "../../interfaces/models/customer.interface";
import { CUSTOMER_REGISTERED_SUCCESSFULLY_AND_CREDENTIALS_SENT_TO_EMAIL } from "../../messages/request-success.messages";


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


    /**
     * Registers a customer and sends a registration confirmation email to the customer's email address.
     * The password is randomly generated and sent to the customer in the email.
     *
     * @param {IExtendedCustomerRequest} req - The request object with the customer registration details in the body.
     * @param {Response} res - The response object to send a success message.
     * @param {NextFunction} next - The next function to pass the error to if registration fails.
     *
     * @returns {Promise<void>}
     */
    public async register(req: IExtendedCustomerRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const registerationRequest: TCustomRegistrationRequest = req.body;
            await this.authService.registerCustomerAndSendPassword(registerationRequest);
            return this.prepareSuccess(res, {
                message: CUSTOMER_REGISTERED_SUCCESSFULLY_AND_CREDENTIALS_SENT_TO_EMAIL,
            });
        } catch (error) {
            next(error);
        }
    }
}

