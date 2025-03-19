import { Router } from 'express';
import dairyRouter from './diaryRouter.js';
import authRoutes from './auth.js';
import testRouter from './test.js';

const router = Router();

router.use('/api/diary', dairyRouter);
router.use('/api/auth', authRoutes);
router.use('/api/test', testRouter);

export default router;
