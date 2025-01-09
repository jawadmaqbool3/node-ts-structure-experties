"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const PublicController_1 = __importDefault(require("../../controllers/PublicController"));
const controller = new PublicController_1.default();
router.get('/nft-sales-page-params', controller.getInitialSalesPageParams.bind(controller));
router.post("/round-values", controller.getNftRoundValues.bind(controller));
router.post('/check-trunk-holder', controller.checkTrunkHolder.bind(controller));
router.post('/place-order', controller.placeOrder.bind(controller));
exports.default = router;
