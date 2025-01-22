import express from 'express';
import authRoutes from './auth.api'
import transactionRoutes from './transactions.api'
import affiliateRoutes from './affiliates.api'
import commissionRoutes from './commissions.api'
import validateCustomer from '../../../middlewares/validate-customer.middleware';

const router = express.Router();


router.use('/auth', authRoutes);

router.use(validateCustomer());
router.use('/transactions', transactionRoutes);
router.use('/affiliates', affiliateRoutes);
router.use('/commissions', commissionRoutes);


export default router;


