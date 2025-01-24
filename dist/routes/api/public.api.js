"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PublicController_1 = __importDefault(require("../../controllers/PublicController"));
const router = express_1.default.Router();
const publicController = new PublicController_1.default();
router.get('/nft-sales-page-params', publicController.getInitialSalesPageParams.bind(publicController));
router.get('/referral-info/:refferalId', publicController.getReferralInfo.bind(publicController));
router.post("/round-values", publicController.getNftRoundValues.bind(publicController));
router.post('/check-trunk-holder', publicController.checkTrunkHolder.bind(publicController));
router.post('/place-order', publicController.placeOrder.bind(publicController));
router.post('/stripe-payment-intent', publicController.createStripePaymentIntent.bind(publicController));
router.post('/create-transaction', publicController.createTransaction.bind(publicController));
router.post('/update-transaction', publicController.updateTransaction.bind(publicController));
exports.default = router;
