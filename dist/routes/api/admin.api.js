"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_admin_api_1 = __importDefault(require("./admin/auth-admin.api"));
const router = express_1.default.Router();
router.use('/auth', auth_admin_api_1.default);
exports.default = router;
