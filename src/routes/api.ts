import express from 'express';

import publicAPIs from './api/public.api'
import customerAPIs from './api/customer.api'
import adminAPIs from './api/admin.api'
import encryptSalesPageResponse from '../middlewares/encrypt-sales-page-response.middleware';
import decryptSalesPageRequest from '../middlewares/decrypt-sales-page-request.middleware';
import validateCustomer from '../middlewares/validate-customer.middleware';

const router = express.Router();

router.use('/admin', adminAPIs);

router.use('/customer', customerAPIs);

router.use('/', 
    decryptSalesPageRequest, 
    validateCustomer(false),
    encryptSalesPageResponse, 
    publicAPIs
);



export default router;
