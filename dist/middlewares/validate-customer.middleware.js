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
exports.default = validateCustomer;
const jwt_1 = require("../utils/jwt");
const request_utils_1 = require("../utils/request.utils");
const CustomerRepository_1 = __importDefault(require("../repositories/CustomerRepository"));
const AccessTokenNotFoundException_1 = __importDefault(require("../exceptions/middlewares/AccessTokenNotFoundException"));
const InvalidAccessTokenProvidedException_1 = __importDefault(require("../exceptions/middlewares/InvalidAccessTokenProvidedException"));
function validateCustomer(STRICT_MODE = true) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (0, request_utils_1.getBearerToken)(req);
            if (STRICT_MODE || token) {
                if (!token)
                    throw new AccessTokenNotFoundException_1.default();
                let { _id } = (0, jwt_1.verifyAccessToken)(token);
                let customer = yield (new CustomerRepository_1.default()).findById(_id);
                if (!customer)
                    throw new InvalidAccessTokenProvidedException_1.default();
                const extendedRequest = req;
                const requestCustomer = customer;
                extendedRequest.customer = requestCustomer;
            }
            ;
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
