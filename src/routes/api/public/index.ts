import express from 'express';
import PublicController from '../../../controllers/PublicController';

const router = express.Router();

const controller = new PublicController();

router.get('/nft-sales-page-params', controller.getInitialSalesPageParams.bind(controller));
router.get('/referral-info/:refferalId', controller.getReferralInfo.bind(controller));
router.post("/round-values", controller.getNftRoundValues.bind(controller));
router.post('/check-trunk-holder', controller.checkTrunkHolder.bind(controller));
router.post('/place-order', controller.placeOrder.bind(controller));
router.post('/stripe-payment-intent', controller.createStripePaymentIntent.bind(controller));
router.post('/create-transaction', controller.createTransaction.bind(controller));
router.post('/update-transaction', controller.updateTransaction.bind(controller));

export default router;


