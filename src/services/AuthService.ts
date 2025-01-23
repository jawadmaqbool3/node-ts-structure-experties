import InvalidCredentialsProvidedException from "../exceptions/auth/InvalidCredentialsProvidedException";
import AdminRepository from "../repositories/AdminRepository";
import { TAuthReponse, TAuthRequest, TCustomRegistrationRequest } from "../types/auth.type";
import Service from "./Service";
import { validateLoginInput, comparePassword, createAuthResponse, hashPassword, validateRegistrationInput, generateRandomString, } from "../utils/auth.utils";
import CustomerRepository from "../repositories/CustomerRepository";
import { ICustomer, ICustomerLean } from "../interfaces/models/customer.interface";
import { IAdmin } from "../interfaces/models/admin.interface";
import { sendAdminOTPEmail, sendRegistrationEmail } from "../utils/email.utils";
import OTPCreationFailedException from "../exceptions/otp/OTPCreationFailedException";
import OTPVerificationFailedException from "../exceptions/otp/OTPVerificationFailedException";
import { validateOrThrowOTP } from "../utils/otp.utils";
import { MIN_PASSWORD_LENGTH } from "../constants/auth.constant";
import EmailAlreadyExistsException from "../exceptions/input-validations/EmailAlreadyExistsException";


export default class AuthService extends Service {

    /**
     * Constructor
     *
     * @param {AdminRepository} [adminRepository=new AdminRepository()] - admin repository
     * @param {CustomerRepository} [customerRepository=new CustomerRepository()] - customer repository
     */

    constructor(
        private adminRepository = new AdminRepository(),
        private customerRepository = new CustomerRepository(),
    ) {
        super();
    }

    /**
     * Authenticates an admin user and sends an OTP to the user's email address.
     * 
     * @param {TAuthRequest} credentials - The admin user's credentials.
     * 
     * @returns {Promise<TAuthReponse>} A promise that resolves to the authenticated admin user and their tokens.
     * 
     * @throws {OTPCreationFailedException} If the OTP creation fails.
     */
    public async authenticateAdminAndSendEmailOtp(credentials: TAuthRequest) {
        let admin = await this.login(credentials, this.adminRepository);
        const updateOtpAdmin = await this.adminRepository.setOTP(admin._id);
        if (!updateOtpAdmin || !updateOtpAdmin.email_otp_code) throw new OTPCreationFailedException();
        await sendAdminOTPEmail(admin as IAdmin, updateOtpAdmin.email_otp_code);
        return createAuthResponse(updateOtpAdmin);
    }

    /**
     * Verifies the provided OTP for the admin user.
     *
     * @param {IAdmin} model - The admin user model containing OTP information.
     * @param {number} otp - The OTP to be verified.
     * 
     * @returns {Promise<IAdmin>} A promise that resolves to the updated admin model with verified OTP status.
     * 
     * @throws {InvalidOtpProvidedException} If the OTP is invalid.
     * @throws {OTPExpiredException} If the OTP has expired.
     * @throws {OTPVerificationFailedException} If the OTP verification fails.
     */

    public async verifyAdminOtp(model: IAdmin, otp: number): Promise<IAdmin> {
        validateOrThrowOTP(model, otp);
        const admin = await this.updateOTPStatus(model, this.adminRepository);
        return admin as IAdmin;
    }

    /**
     * Updates the OTP verification status of the specified admin or customer model.
     *
     * This method updates the `is_email_otp_verified` field to true and sets the
     * `email_otp_code` to null, indicating that the OTP has been successfully verified.
     *
     * @param model - The admin or customer model whose OTP verification status is to be updated.
     * @param repository - The repository instance used to perform the update operation.
     *
     * @returns A promise that resolves to the updated admin or customer model with the verified OTP status.
     *
     * @throws {OTPVerificationFailedException} If the update operation fails.
     */

    private async updateOTPStatus(model: IAdmin | ICustomer, repository: CustomerRepository | AdminRepository): Promise<IAdmin | ICustomer> {
        const updatedModel = await repository.update(model._id, { is_email_otp_verified: true, email_otp_code: null });
        if (!updatedModel) throw new OTPVerificationFailedException();
        return updatedModel;
    }


    /**
     * Authenticates an admin user and returns their tokens.
     * 
     * @param {TAuthRequest} credentials - The admin user's credentials.
     * 
     * @returns {Promise<TAuthReponse>} A promise that resolves to the authenticated admin user and their tokens.
     * 
     * @throws {InvalidCredentialsProvidedException} If the provided credentials are invalid.
     */
    public async adminLogin(credentials: TAuthRequest): Promise<TAuthReponse> {
        const admin = await this.login(credentials, this.adminRepository);
        return createAuthResponse(admin);
    }


    /**
     * Authenticates a customer user and returns their tokens.
     * 
     * @param {TAuthRequest} credentials - The customer's credentials.
     * 
     * @returns {Promise<TAuthReponse>} A promise that resolves to the authenticated customer user and their tokens.
     * 
     * @throws {InvalidCredentialsProvidedException} If the provided credentials are invalid.
     */

    public async customerLogin(credentials: TAuthRequest): Promise<TAuthReponse> {
        const customer = await this.login(credentials, this.customerRepository);
        return createAuthResponse(customer);
    }

    /**
     * Authenticates a user using the provided credentials and returns the user document.
     * 
     * @param {TAuthRequest} credentials - The user's credentials.
     * @param {CustomerRepository | AdminRepository} repository - The repository to use to search for the user.
     * 
     * @returns {Promise<IAdmin | ICustomer>} A promise that resolves to the authenticated user document.
     * 
     * @throws {InvalidCredentialsProvidedException} If the provided credentials are invalid.
     */
    public async login(credentials: TAuthRequest, repository: CustomerRepository | AdminRepository): Promise<IAdmin | ICustomer> {
        const { email, password } = credentials;
        validateLoginInput(credentials);
        const user = await repository.searchByEmail(email);
        if (!user) throw new InvalidCredentialsProvidedException();
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw new InvalidCredentialsProvidedException();
        return user;
    }




    /**
     * Registers a customer and sends a registration confirmation email to the specified customer.
     * The password is randomly generated and sent to the customer in the email.
     * 
     * @param {TCustomRegistrationRequest} registerationRequest - The registration request to use to register the customer.
     * 
     * @returns {Promise<TAuthReponse>} A promise that resolves to the authenticated customer user and their tokens.
     * 
     * @throws {InvalidCredentialsProvidedException} If the provided credentials are invalid.
     */
    public async registerCustomerAndSendPassword(registerationRequest: TCustomRegistrationRequest): Promise<TAuthReponse> {
        const password = generateRandomString(MIN_PASSWORD_LENGTH);
        const customer = await this.registerCustomer({
            ...registerationRequest,
            password
        });
        customer.password = password;
        await sendRegistrationEmail(customer);
        return createAuthResponse(customer);
    }


    /**
     * Registers a customer user with the given registration request.
     * The password is hashed before storing in the database.
     * 
     * @param {TCustomRegistrationRequest} registerationRequest - The registration request to use to register the customer.
     * 
     * @returns {Promise<ICustomer>} A promise that resolves to the newly registered customer user.
     * 
     * @throws {InvalidCredentialsProvidedException} If the provided credentials are invalid.
     */
    public async registerCustomer(registerationRequest: TCustomRegistrationRequest): Promise<ICustomer> {
        await this.validateCustomerRegistrationRequest(registerationRequest);
        const { password } = registerationRequest;
        const hashedPassword = password ? await hashPassword(password) : '';
        return await this.customerRepository.create({
            ...registerationRequest,
            password: hashedPassword
        });
    }

    public async validateCustomerRegistrationRequest(registerationRequest: TCustomRegistrationRequest): Promise<void> {
        validateRegistrationInput(registerationRequest);
        const { email } = registerationRequest;
        const customer = await this.customerRepository.searchByEmail(email);
        if (customer) throw new EmailAlreadyExistsException();
    }
}
