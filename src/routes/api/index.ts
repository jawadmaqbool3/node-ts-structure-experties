import express from 'express';

import publicAPIs from './public.api'

const router = express.Router();

router.use('/public', publicAPIs);

export default router;
