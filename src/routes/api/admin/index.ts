import express from 'express';
import authRoutes from './auth.api'

const router = express.Router();


router.use('/auth', authRoutes);



export default router;


