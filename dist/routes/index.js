"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./api/index"));
const check_ip_middleware_1 = __importDefault(require("../middlewares/check-ip.middleware"));
const router = express_1.default.Router();
router.use('/api', check_ip_middleware_1.default, index_1.default);
exports.default = router;
