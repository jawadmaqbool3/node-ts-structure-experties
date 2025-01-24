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
exports.sendAdminOTPEmail = sendAdminOTPEmail;
exports.sendRegistrationEmail = sendRegistrationEmail;
const AuthMailer_1 = __importDefault(require("../mailers/AuthMailer"));
/**
 * Sends an OTP email to the specified admin.
 *
 * @param {IAdmin} admin - The admin object containing the email address to send the OTP to.
 * @param {number} otp - The one-time password to be included in the email.
 * @returns {Promise<void>} A promise that resolves when the email has been sent.
 */
function sendAdminOTPEmail(admin, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailService = new AuthMailer_1.default();
        yield emailService.sendAdminOTPEmail(admin, otp);
    });
}
/**
 * Sends a registration confirmation email to the specified customer.
 *
 * @param {ICustomer} customer - The customer object containing the email address to send the email to.
 * @returns {Promise<void>} A promise that resolves when the email has been sent.
 */
function sendRegistrationEmail(customer) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailService = new AuthMailer_1.default();
        yield emailService.sendRegistrationEmail(customer);
    });
}
