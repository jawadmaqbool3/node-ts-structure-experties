import express from 'express';
import authRoutes from './customer/auth-customer.api'
import transactionRoutes from './customer/transactions-customer.api'
import affiliateRoutes from './customer/affiliates-customer.api'
import commissionRoutes from './customer/commissions-customer.api'
import validateCustomer from '../../middlewares/validate-customer.middleware';

const router = express.Router();


router.use('/auth', authRoutes);

router.use(validateCustomer());
router.use('/transactions', transactionRoutes);
router.use('/affiliates', affiliateRoutes);
router.use('/commissions', commissionRoutes);


export default router;


