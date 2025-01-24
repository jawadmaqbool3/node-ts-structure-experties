"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../../../controllers/admin/AuthController"));
const validate_admin_middleware_1 = __importDefault(require("../../../middlewares/validate-admin.middleware"));
const router = express_1.default.Router();
const controller = new AuthController_1.default();
router.post('/login', controller.login.bind(controller));
router.post('/verify-otp', (0, validate_admin_middleware_1.default)(), controller.verifyOtp.bind(controller));
router.post('/verify-2fa', (0, validate_admin_middleware_1.default)(), controller.verifyTfa.bind(controller));
exports.default = router;
