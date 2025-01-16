import express from 'express';

import publicAPIs from './public.api'
import encryptSalesPageResponse from '../../middlewares/encrypt-sales-page-response.middleware';
import decryptSalesPageRequest from '../../middlewares/decrypt-sales-page-request.middleware';

const router = express.Router();

router.use('/', 
    decryptSalesPageRequest, 
    encryptSalesPageResponse, 
    publicAPIs
);

export default router;
