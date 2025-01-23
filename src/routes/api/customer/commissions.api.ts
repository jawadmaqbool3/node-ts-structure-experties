import express from 'express';
import CommissionController from '../../../controllers/customer/CommissionController';

const router = express.Router();

const commissionController = new CommissionController();

router.get('/', commissionController.list.bind(commissionController));

export default router;


