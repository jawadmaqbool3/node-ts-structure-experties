"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommissionController_1 = __importDefault(require("../../../controllers/customer/CommissionController"));
const router = express_1.default.Router();
const commissionController = new CommissionController_1.default();
router.get('/', commissionController.list.bind(commissionController));
exports.default = router;
