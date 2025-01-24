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
exports.default = validateIfAccessToken;
const jwt_1 = require("../utils/jwt");
const CustomerRepository_1 = __importDefault(require("../repositories/CustomerRepository"));
const request_utils_1 = require("../utils/request.utils");
/**
 * Middleware to check and validate the customer from the incoming request.
 * This middleware extracts the Bearer token from the request, verifies it,
 * and uses the token's payload to find the associated customer in the database.
 * If the customer is found, it extends the request object with the customer details.
 *
 * @param {Request | IExtendedCustomerRequest} req - Express request object that may contain a Bearer token in headers or cookies.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 *
 * @throws Will pass any errors to the next middleware, including token verification errors or database access issues.
 */
function validateIfAccessToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (0, request_utils_1.getBearerToken)(req);
            if (token) {
                let { _id } = (0, jwt_1.verifyAccessToken)(token);
                let customer = yield (new CustomerRepository_1.default()).findById(_id);
                if (customer) {
                    const extendedRequest = req;
                    const requestCustomer = customer;
                    extendedRequest.customer = requestCustomer;
                }
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
