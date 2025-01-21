import express from 'express';
import AuthController from '../../../controllers/admin/AuthController';
import checkIsAdmin from '../../../middlewares/check-is-admin.middleware';

const router = express.Router();

const controller = new AuthController();

router.post('/login', controller.login.bind(controller));
router.post('/verify-otp', checkIsAdmin, controller.verifyOtp.bind(controller));



export default router;


