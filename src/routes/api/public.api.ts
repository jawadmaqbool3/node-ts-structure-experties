import express from 'express';

const router = express.Router();

import PublicController from '../../controllers/PublicController';

const controller = new PublicController();

router.get('/nft-sales-page-params', controller.getInitialSalesPageParams.bind(controller));

router.post("/round-values", controller.getNftRoundValues.bind(controller));
router.post('/check-trunk-holder', controller.checkTrunkHolder.bind(controller));
router.post('/place-order', controller.placeOrder.bind(controller));
router.post('/stripe-payment-intent', controller.createStripePaymentIntent.bind(controller));


export default router;
