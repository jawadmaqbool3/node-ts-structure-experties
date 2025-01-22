import express from 'express';

import publicAPIs from './public'
import customerAPIs from './customer'
import adminAPIs from './admin'
import encryptSalesPageResponse from '../../middlewares/encrypt-sales-page-response.middleware';
import decryptSalesPageRequest from '../../middlewares/decrypt-sales-page-request.middleware';
import validateCustomer from '../../middlewares/validate-customer.middleware';

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
