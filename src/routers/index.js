import { Router } from 'express';
import dairyRouter from './diaryRouter.js';
import authRoutes from './auth.js';

const router = Router();

router.use('/api/diary', dairyRouter);
router.use('/api/auth', authRoutes);

export default router;
