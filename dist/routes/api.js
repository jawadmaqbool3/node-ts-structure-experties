"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const public_api_1 = __importDefault(require("./api/public.api"));
const customer_api_1 = __importDefault(require("./api/customer.api"));
const admin_api_1 = __importDefault(require("./api/admin.api"));
const encrypt_sales_page_response_middleware_1 = __importDefault(require("../middlewares/encrypt-sales-page-response.middleware"));
const decrypt_sales_page_request_middleware_1 = __importDefault(require("../middlewares/decrypt-sales-page-request.middleware"));
const validate_customer_middleware_1 = __importDefault(require("../middlewares/validate-customer.middleware"));
const router = express_1.default.Router();
router.use('/admin', admin_api_1.default);
router.use('/customer', customer_api_1.default);
router.use('/', decrypt_sales_page_request_middleware_1.default, (0, validate_customer_middleware_1.default)(false), encrypt_sales_page_response_middleware_1.default, public_api_1.default);
exports.default = router;
