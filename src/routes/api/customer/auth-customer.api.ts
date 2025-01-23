import express from 'express';
import AuthController from '../../../controllers/customer/AuthController';

const router = express.Router();

const authController = new AuthController();

router.post('/login', authController.login.bind(authController));
router.post('/registration', authController.register.bind(authController));




export default router;


