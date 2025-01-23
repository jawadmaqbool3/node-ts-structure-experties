import express from 'express';
import AuthController from '../../../controllers/admin/AuthController';
import validateAdmin from '../../../middlewares/validate-admin.middleware';

const router = express.Router();

const controller = new AuthController();

router.post('/login', controller.login.bind(controller));
router.post('/verify-otp', validateAdmin(), controller.verifyOtp.bind(controller));
router.post('/verify-2fa', validateAdmin(), controller.verifyTfa.bind(controller));



export default router;


