"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TransactionController_1 = __importDefault(require("../../../controllers/customer/TransactionController"));
const router = express_1.default.Router();
const transactionController = new TransactionController_1.default();
router.get('/', transactionController.list.bind(transactionController));
exports.default = router;
