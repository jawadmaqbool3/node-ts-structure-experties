import express from 'express';

import api from './api/index';
import checkIP from '../middlewares/check-ip';

const router = express.Router();
router.use('/api', checkIP, api);

export default router;
