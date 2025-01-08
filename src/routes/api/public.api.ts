import express from 'express';

const router = express.Router();

import PublicController from '../../controllers/PublicController';

const controller = new PublicController();

router.get('/nft-sales-page-params', controller.getInitialSalesPageParams.bind(controller));


export default router;
