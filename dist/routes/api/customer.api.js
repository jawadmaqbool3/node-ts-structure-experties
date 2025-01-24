"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_customer_api_1 = __importDefault(require("./customer/auth-customer.api"));
const transactions_customer_api_1 = __importDefault(require("./customer/transactions-customer.api"));
const affiliates_customer_api_1 = __importDefault(require("./customer/affiliates-customer.api"));
const commissions_customer_api_1 = __importDefault(require("./customer/commissions-customer.api"));
const validate_customer_middleware_1 = __importDefault(require("../../middlewares/validate-customer.middleware"));
const router = express_1.default.Router();
router.use('/auth', auth_customer_api_1.default);
router.use((0, validate_customer_middleware_1.default)());
router.use('/transactions', transactions_customer_api_1.default);
router.use('/affiliates', affiliates_customer_api_1.default);
router.use('/commissions', commissions_customer_api_1.default);
exports.default = router;
