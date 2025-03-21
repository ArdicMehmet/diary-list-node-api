import express from 'express';
import authRouter from './auth.js';
import diaryRouter from './diaryRouter.js';
import productRouter from './productRouter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/diary', diaryRouter);
router.use('/products', productRouter);

export default router;
