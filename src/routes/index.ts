import express from 'express';

import api from './api';
import validateIp from '../middlewares/validate-ip.middleware';

const router = express.Router();

router.use('/api', validateIp, api);

export default router;
