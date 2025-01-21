import EmailIsNotProvidedException from "../exceptions/auth/EmailIsNotProvidedException";
import InvalidCredentialsProvidedException from "../exceptions/auth/InvalidCredentialsProvidedException";
import PasswordNotProvidedException from "../exceptions/auth/PasswordNotProvidedException";
import AdminRepository from "../repositories/AdminRepository";
import { TAuthReponse, TAuthRequest, TAuthUser } from "../types/auth.type";
import Service from "./Service";
import { authenticateLoginInput, comparePassword, createAuthResponse, generateOTP, sanitizeAuthUser } from "../utils/auth.utils";
import CustomerRepository from "../repositories/CustomerRepository";
import { ICustomer } from "../interfaces/models/customer.interface";
import { IAdmin } from "../interfaces/models/admin.interface";
import { sendAdminOTPEmail } from "../utils/email.utils";
import OTPCreationFailedException from "../exceptions/auth/OTPCreationFailedException";


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
        if(!updateOtpAdmin) throw new OTPCreationFailedException();
        await sendAdminOTPEmail(admin as IAdmin, updateOtpAdmin.email_otp_code);
        return createAuthResponse(updateOtpAdmin);
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
