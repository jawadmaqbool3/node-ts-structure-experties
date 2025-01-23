import express from 'express';
import AffiliateController from '../../../controllers/customer/AffiliateController';

const router = express.Router();

const affilateController = new AffiliateController();

router.get('/', affilateController.list.bind(affilateController));


export default router;


