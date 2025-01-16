import express from 'express';

import publicAPIs from './public.api'
import decryptRequest from '../../middlewares/decrypt-request.middleware';
import encryptResponse from '../../middlewares/encrypt-response.middleware';

const router = express.Router();

router.use('/', decryptRequest, encryptResponse, publicAPIs);

export default router;
