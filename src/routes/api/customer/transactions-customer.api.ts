import express from 'express';
import TransactionController from '../../../controllers/customer/TransactionController';

const router = express.Router();

const transactionController = new TransactionController();

router.get('/', transactionController.list.bind(transactionController));

export default router;


