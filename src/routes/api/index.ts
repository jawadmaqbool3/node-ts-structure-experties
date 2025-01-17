import express from 'express';

import publicAPIs from './public.api'
import encryptSalesPageResponse from '../../middlewares/encrypt-sales-page-response.middleware';
import decryptSalesPageRequest from '../../middlewares/decrypt-sales-page-request.middleware';
import validateIfAccessToken from '../../middlewares/validate-if-customer-token.middleware';

const router = express.Router();

router.use('/', 
    decryptSalesPageRequest, 
    validateIfAccessToken,
    encryptSalesPageResponse, 
    publicAPIs
);

export default router;
