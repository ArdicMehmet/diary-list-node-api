import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import { getDiaryController } from '../controllers/diaryController.js';
import { isValidDate } from '../middlewares/isValidDate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get(
  '/:date',
  isValidDate,
  authenticate,
  ctrlWrapper(getDiaryController),
);

export default router;
