"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidCredentialsProvidedException_1 = __importDefault(require("../exceptions/auth/InvalidCredentialsProvidedException"));
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
const Service_1 = __importDefault(require("./Service"));
const auth_utils_1 = require("../utils/auth.utils");
const CustomerRepository_1 = __importDefault(require("../repositories/CustomerRepository"));
const email_utils_1 = require("../utils/email.utils");
const OTPCreationFailedException_1 = __importDefault(require("../exceptions/otp/OTPCreationFailedException"));
const OTPVerificationFailedException_1 = __importDefault(require("../exceptions/otp/OTPVerificationFailedException"));
const otp_utils_1 = require("../utils/otp.utils");
const auth_constant_1 = require("../constants/auth.constant");
const EmailAlreadyExistsException_1 = __importDefault(require("../exceptions/input-validations/EmailAlreadyExistsException"));
const InvalidTfaCodeProvidedException_1 = __importDefault(require("../exceptions/auth/InvalidTfaCodeProvidedException"));
class AuthService extends Service_1.default {
    /**
     * Constructor
     *
     * @param {AdminRepository} [adminRepository=new AdminRepository()] - admin repository
     * @param {CustomerRepository} [customerRepository=new CustomerRepository()] - customer repository
     */
    constructor(adminRepository = new AdminRepository_1.default(), customerRepository = new CustomerRepository_1.default()) {
        super();
        this.adminRepository = adminRepository;
        this.customerRepository = customerRepository;
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
    authenticateAdminAndSendEmailOtp(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = yield this.login(credentials, this.adminRepository);
            admin = yield this.resetVerificationChecks(admin);
            const updateOtpAdmin = yield this.adminRepository.setOTP(admin._id);
            if (!updateOtpAdmin || !updateOtpAdmin.email_otp_code)
                throw new OTPCreationFailedException_1.default();
            yield (0, email_utils_1.sendAdminOTPEmail)(admin, updateOtpAdmin.email_otp_code);
            return (0, auth_utils_1.createAuthResponse)(updateOtpAdmin);
        });
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
    verifyAdminOtp(model, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, otp_utils_1.validateOrThrowOTP)(model, otp);
            const admin = yield this.updateOTPStatus(model, this.adminRepository);
            return admin;
        });
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
    updateOTPStatus(model, repository) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedModel = yield repository.update(model._id, { is_email_otp_verified: true, email_otp_code: null });
            if (!updatedModel)
                throw new OTPVerificationFailedException_1.default();
            return updatedModel;
        });
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
    adminLogin(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = yield this.login(credentials, this.adminRepository);
            return (0, auth_utils_1.createAuthResponse)(admin);
        });
    }
    /**
     * Resets the verification checks for the given admin.
     *
     * This method updates the admin's verification status based on their email OTP and TFA settings.
     * It sets `is_email_otp_verified` to false if email OTP is enabled, and `is_tfa_verified` to false if TFA is enabled.
     *
     * @param {IAdmin} admin - The admin whose verification checks are to be reset.
     *
     * @returns {Promise<IAdmin>} A promise that resolves to the updated admin with reset verification checks.
     */
    resetVerificationChecks(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateAdmin = yield this.adminRepository.update(admin._id, {
                is_email_otp_verified: !admin.is_email_otp_enabled,
                is_tfa_verified: !admin.is_tfa_enabled
            });
            return updateAdmin;
        });
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
    customerLogin(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.login(credentials, this.customerRepository);
            return (0, auth_utils_1.createAuthResponse)(customer);
        });
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
    login(credentials, repository) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = credentials;
            (0, auth_utils_1.validateLoginInput)(credentials);
            const user = yield repository.searchByEmail(email);
            if (!user)
                throw new InvalidCredentialsProvidedException_1.default();
            const isPasswordValid = yield (0, auth_utils_1.comparePassword)(password, user.password);
            if (!isPasswordValid)
                throw new InvalidCredentialsProvidedException_1.default();
            return user;
        });
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
    registerCustomerAndSendPassword(registerationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = (0, auth_utils_1.generateRandomString)(auth_constant_1.MIN_PASSWORD_LENGTH);
            const customer = yield this.registerCustomer(Object.assign(Object.assign({}, registerationRequest), { password }));
            customer.password = password;
            yield (0, email_utils_1.sendRegistrationEmail)(customer);
            return (0, auth_utils_1.createAuthResponse)(customer);
        });
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
    registerCustomer(registerationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateCustomerRegistrationRequest(registerationRequest);
            const { password } = registerationRequest;
            const hashedPassword = password ? yield (0, auth_utils_1.hashPassword)(password) : '';
            return yield this.customerRepository.create(Object.assign(Object.assign({}, registerationRequest), { password: hashedPassword }));
        });
    }
    /**
     * Validates the given customer registration request by checking that the email is not already in use.
     * This function is used to validate the input to the /register endpoint.
     *
     * @param {TCustomRegistrationRequest} registerationRequest - The customer registration request to validate.
     *
     * @throws {EmailAlreadyExistsException} If the email is already in use.
     */
    validateCustomerRegistrationRequest(registerationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, auth_utils_1.validateRegistrationInput)(registerationRequest);
            const { email } = registerationRequest;
            const customer = yield this.customerRepository.searchByEmail(email);
            if (customer)
                throw new EmailAlreadyExistsException_1.default();
        });
    }
    /**
     * Verifies the TFA code for the given admin user.
     *
     * @param {IAdmin} admin - The admin user to verify the TFA code for.
     * @param {string} code - The TFA code to verify.
     *
     * @returns {IAdmin} The admin user if the TFA code is valid.
     *
     * @throws {InvalidTfaCodeProvidedException} If the TFA code is invalid.
     */
    verifyTfa(admin, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const isVerfied = (0, auth_utils_1.verifyTfa)(code, admin.tfa_secret);
            if (!isVerfied)
                throw new InvalidTfaCodeProvidedException_1.default();
            const verfiedAdmin = yield this.adminRepository.update(admin._id, { is_tfa_verified: true });
            return verfiedAdmin;
        });
    }
}
exports.default = AuthService;
