"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const validate_ip_middleware_1 = __importDefault(require("../middlewares/validate-ip.middleware"));
const router = express_1.default.Router();
router.use('/api', validate_ip_middleware_1.default, api_1.default);
exports.default = router;
