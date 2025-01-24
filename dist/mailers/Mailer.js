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
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_constant_1 = require("../constants/env.constant");
class Mailer {
    /**
     * Creates an instance of the Mailer class.
     *
     * @remarks
     * If the transporter property is not already set, it will be set up using the
     * values from the environment variables. This is done to ensure that the
     * transporter is only set up once, and to prevent having to set it up
     * every time a new instance of the Mailer class is created.
     */
    constructor() {
        if (!Mailer.transporter) {
            Mailer.transporter = nodemailer_1.default.createTransport({
                host: env_constant_1.EMAIL_HOST,
                port: env_constant_1.EMAIL_PORT,
                secure: true,
                auth: {
                    user: env_constant_1.EMAIL_USER,
                    pass: env_constant_1.EMAIL_PASSWORD,
                },
            });
        }
    }
    /**
     * Sends an email using the transporter.
     *
     * @param mailOptions The mail options to use when sending the email.
     *
     * @returns A promise that resolves when the email has been sent.
     */
    send(mailOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return Mailer.transporter.sendMail(mailOptions);
        });
    }
}
exports.default = Mailer;
