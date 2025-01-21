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



/**
 * Middleware to validate admin access using a Bearer token.
 * 
 * This middleware extracts the Bearer token from the request, verifies it,
 * and uses the token's payload to find the associated admin in the database.
 * It also optionally checks for OTP and TFA verification statuses.
 * 
 * @param {boolean} checkOtpVerification - Whether to check if the admin's email OTP is verified.
 * @param {boolean} checkTfaVerification - Whether to check if the admin's TFA is verified.
 * 
 * @returns An async function that serves as Express middleware.
 * 
 * @throws {AccessTokenNotFoundException} If no access token is provided in the request.
 * @throws {InvalidAccessTokenProvidedException} If the token is invalid or the admin is not found.
 * @throws {OTPVerificationFailedException} If OTP verification is required and the admin's OTP is not verified.
 * @throws {TFAVerificationFailedException} If TFA verification is required and the admin's TFA is not verified.
 */

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