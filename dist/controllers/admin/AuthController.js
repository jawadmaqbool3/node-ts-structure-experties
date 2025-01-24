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
const Controller_1 = __importDefault(require("../Controller"));
const AuthService_1 = __importDefault(require("../../services/AuthService"));
const request_success_messages_1 = require("../../messages/request-success.messages");
const exceptions_messages_1 = require("../../messages/exceptions.messages");
class AuthController extends Controller_1.default {
    /**
     * Constructor for the AuthController.
     *
     * Initializes the AuthController with an instance of AuthService.
     *
     * @param {AuthService} [authService] - An instance of AuthService, defaulting to a new instance.
     */
    constructor(authService = new AuthService_1.default()) {
        super();
        this.authService = authService;
    }
    /**
     * Authenticates an admin user and sends an OTP to the user's email address.
     *
     * @param {IExtendedAdminRequest} req - The request object with the admin user credentials.
     * @param {Response} res - The response object to send a success message.
     * @param {NextFunction} next - The next function to pass the error to if authentication fails.
     *
     * @returns {Promise<void>}
     */
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authRequest = req.body;
                const tokens = yield this.authService.authenticateAdminAndSendEmailOtp(authRequest);
                return this.prepareSuccess(res, Object.assign({ message: request_success_messages_1.OTP_IS_SENT_TO_EMAIL }, tokens));
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Verifies the OTP for the given admin user.
     *
     * @param {IExtendedAdminRequest} req - The request object with the admin user's OTP to be verified.
     * @param {Response} res - The response object to send a success message.
     * @param {NextFunction} next - The next function to pass the error to if the verification fails.
     *
     * @returns {Promise<void>}
     */
    verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verificationRequest = req.body;
                const admin = req.admin;
                yield this.authService.verifyAdminOtp(admin, verificationRequest.otp);
                return this.prepareSuccess(res, {
                    message: request_success_messages_1.OTP_VERIFIED_SUCCESSFULLY
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Verifies the TFA code for the given admin user.
     *
     * @param {IExtendedAdminRequest} req - The request object containing the admin user and TFA code.
     * @param {Response} res - The response object to send a success message.
     * @param {NextFunction} next - The next function to pass the error to if the verification fails.
     *
     * @returns {Promise<void>}
     */
    verifyTfa(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = req.admin;
                const { code } = req.body;
                yield this.authService.verifyTfa(admin, code);
                return this.prepareSuccess(res, {
                    message: exceptions_messages_1.TFA_VERIFIED_SUCCESSFULLY,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AuthController;
