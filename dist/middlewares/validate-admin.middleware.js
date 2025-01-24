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
exports.default = validateAdmin;
const jwt_1 = require("../utils/jwt");
const request_utils_1 = require("../utils/request.utils");
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
const AccessTokenNotFoundException_1 = __importDefault(require("../exceptions/middlewares/AccessTokenNotFoundException"));
const InvalidAccessTokenProvidedException_1 = __importDefault(require("../exceptions/middlewares/InvalidAccessTokenProvidedException"));
const OTPVerificationFailedException_1 = __importDefault(require("../exceptions/otp/OTPVerificationFailedException"));
const TFAVerificationFailedException_1 = __importDefault(require("../exceptions/tfa/TFAVerificationFailedException"));
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
function validateAdmin(checkOtpVerification = false, checkTfaVerification = false) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (0, request_utils_1.getBearerToken)(req);
            if (!token)
                throw new AccessTokenNotFoundException_1.default();
            let { _id } = (0, jwt_1.verifyAccessToken)(token);
            let admin = yield (new AdminRepository_1.default()).findById(_id);
            if (!admin)
                throw new InvalidAccessTokenProvidedException_1.default();
            if (checkOtpVerification && !admin.is_email_otp_verified)
                throw new OTPVerificationFailedException_1.default();
            if (checkTfaVerification && !admin.is_tfa_verified)
                throw new TFAVerificationFailedException_1.default();
            const extendedRequest = req;
            const requestAdmin = admin;
            extendedRequest.admin = requestAdmin;
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
