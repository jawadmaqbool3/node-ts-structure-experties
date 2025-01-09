import express from 'express';

import publicAPIs from './public.api'

const router = express.Router();

router.use('/', publicAPIs);

export default router;
