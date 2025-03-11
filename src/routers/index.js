import { Router } from 'express';
import dairyRouter from './diaryRouter.js';
const router = Router();

router.use('/api/diary', dairyRouter);

export default router;
