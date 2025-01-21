import InvalidCredentialsProvidedException from "../exceptions/auth/InvalidCredentialsProvidedException";
import AdminRepository from "../repositories/AdminRepository";
import { TAuthReponse, TAuthRequest } from "../types/auth.type";
import Service from "./Service";
import { authenticateLoginInput, comparePassword, createAuthResponse, } from "../utils/auth.utils";
import CustomerRepository from "../repositories/CustomerRepository";
import { ICustomer } from "../interfaces/models/customer.interface";
import { IAdmin } from "../interfaces/models/admin.interface";
import { sendAdminOTPEmail } from "../utils/email.utils";
import OTPCreationFailedException from "../exceptions/otp/OTPCreationFailedException";
import InvalidOtpProvidedException from "../exceptions/otp/InvalidOtpProvidedException";
import OTPVerificationFailedException from "../exceptions/otp/OTPVerificationFailedException";
import { validateOrThrowOTP } from "../utils/otp.utils";


export default class AuthService extends Service {

    constructor(
        private adminRepository = new AdminRepository(),
        private customerRepository = new CustomerRepository(),
    ) {
        super();
    }

    public async authenticateAdminAndSendEmailOtp(credentials: TAuthRequest) {
        let admin = await this.login(credentials, this.adminRepository);
        const updateOtpAdmin = await this.adminRepository.resetOTP(admin._id);
        if (!updateOtpAdmin || !updateOtpAdmin.email_otp_code) throw new OTPCreationFailedException();
        await sendAdminOTPEmail(admin as IAdmin, updateOtpAdmin.email_otp_code);
        return createAuthResponse(updateOtpAdmin);
    }

    public async verifyAdminOtp(model: IAdmin, otp: number): Promise<IAdmin> {
        validateOrThrowOTP(model, otp);
        const admin = await this.updateOTPStatus(model, this.adminRepository);
        return admin as IAdmin;
    }

    private async updateOTPStatus(model: IAdmin | ICustomer, repository: CustomerRepository | AdminRepository): Promise<IAdmin | ICustomer> {
        const updatedModel = await repository.update(model._id, { is_email_otp_verified: true, email_otp_code: null });
        if (!updatedModel) throw new OTPVerificationFailedException();
        return updatedModel;
    }


    public async adminLogin(credentials: TAuthRequest): Promise<TAuthReponse> {
        const admin = await this.login(credentials, this.adminRepository);
        return createAuthResponse(admin);
    }


    public async customerLogin(credentials: TAuthRequest): Promise<TAuthReponse> {
        const customer = await this.login(credentials, this.customerRepository);
        return createAuthResponse(customer);
    }

    public async login(credentials: TAuthRequest, repository: CustomerRepository | AdminRepository): Promise<IAdmin | ICustomer> {
        const { email, password } = credentials;
        authenticateLoginInput(credentials);
        const user = await repository.searchByEmail(email);
        if (!user) throw new InvalidCredentialsProvidedException();
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw new InvalidCredentialsProvidedException();
        return user;
    }









}
