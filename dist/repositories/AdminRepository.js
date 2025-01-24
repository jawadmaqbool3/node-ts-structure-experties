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
const Repository_1 = __importDefault(require("./Repository"));
const admin_model_1 = __importDefault(require("../database/models/admin.model"));
const auth_utils_1 = require("../utils/auth.utils");
class AdminRepository extends Repository_1.default {
    constructor() {
        super(admin_model_1.default);
    }
    /**
     * Searches for an admin by their email address in a case-insensitive manner.
     *
     * @param email The email address to search for.
     *
     * @returns A promise that resolves to the found admin or null if no admin matches the email address.
     */
    searchByEmail(email) {
        return this.findOne({ "email": { "$regex": `^${email}$`, "$options": "i" } });
    }
    /**
     * Resets the OTP for the specified admin. This sets the OTP code and the generation time.
     * This also sets the OTP verification status to false.
     *
     * @param _id The ID of the admin to reset the OTP for.
     *
     * @returns A promise that resolves to the updated admin object on success or null on failure.
     */
    setOTP(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = (0, auth_utils_1.generateOTP)();
            return yield this.update(_id, {
                email_otp_code: otp,
                is_email_otp_verified: false,
                otp_generated_at: new Date()
            });
        });
    }
}
exports.default = AdminRepository;
