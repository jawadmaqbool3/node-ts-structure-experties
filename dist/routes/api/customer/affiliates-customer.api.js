"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AffiliateController_1 = __importDefault(require("../../../controllers/customer/AffiliateController"));
const router = express_1.default.Router();
const affilateController = new AffiliateController_1.default();
router.get('/', affilateController.list.bind(affilateController));
exports.default = router;
