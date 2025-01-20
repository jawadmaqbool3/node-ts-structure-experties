import express from 'express';

const router = express.Router();

import AuthController from '../../controllers/admin/AuthController';

const controller = new AuthController();

router.get('/login', controller.login.bind(controller));



export default router;


