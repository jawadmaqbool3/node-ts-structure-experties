import { Response, NextFunction, Request } from "express";
import { IExtendedAdminRequest } from "../interfaces/request.interface";
import { verifyAccessToken } from "../utils/jwt";
import { getBearerToken } from "../utils/request.utils";
import AdminRepository from "../repositories/AdminRepository";
import AccessTokenNotFoundException from "../exceptions/middlewares/AccessTokenNotFoundException";
import InvalidAccessTokenProvidedException from "../exceptions/middlewares/InvalidAccessTokenProvidedException";
import { IAdmin } from "../interfaces/models/admin.interface";
import OTPVerificationFailedException from "../exceptions/otp/OTPVerificationFailedException";
import TFAVerificationFailedException from "../exceptions/tfa/TFAVerificationFailedException";



export default function validateAdmin(checkOtpVerification = false, checkTfaVerification = false) {
    return async (req: Request | IExtendedAdminRequest, res: Response, next: NextFunction) => {
        try {
            const token = getBearerToken(req);
            if (!token) throw new AccessTokenNotFoundException();
            let { _id } = verifyAccessToken(token);
            let admin = await (new AdminRepository()).findById(_id);
            if (!admin) throw new InvalidAccessTokenProvidedException();
            if (checkOtpVerification && !admin.is_email_otp_verified) throw new OTPVerificationFailedException();
            if (checkTfaVerification && !admin.is_tfa_verified) throw new TFAVerificationFailedException();
            const extendedRequest: IExtendedAdminRequest = req;
            const requestAdmin: IAdmin = admin;
            extendedRequest.admin = requestAdmin;
            next();
        } catch (err) {
            next(err);
        }
    }

}