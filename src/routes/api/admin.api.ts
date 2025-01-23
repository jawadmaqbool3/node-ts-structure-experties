import express from 'express';
import authRoutes from './admin/auth-admin.api'

const router = express.Router();


router.use('/auth', authRoutes);



export default router;


