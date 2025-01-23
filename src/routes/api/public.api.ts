import express from 'express';
import PublicController from '../../controllers/PublicController';

const router = express.Router();

const publicController = new PublicController();

router.get('/nft-sales-page-params', publicController.getInitialSalesPageParams.bind(publicController));
router.get('/referral-info/:refferalId', publicController.getReferralInfo.bind(publicController));
router.post("/round-values", publicController.getNftRoundValues.bind(publicController));
router.post('/check-trunk-holder', publicController.checkTrunkHolder.bind(publicController));
router.post('/place-order', publicController.placeOrder.bind(publicController));
router.post('/stripe-payment-intent', publicController.createStripePaymentIntent.bind(publicController));
router.post('/create-transaction', publicController.createTransaction.bind(publicController));
router.post('/update-transaction', publicController.updateTransaction.bind(publicController));

export default router;


