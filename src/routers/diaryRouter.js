import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import {
  addDiaryController,
  deleteDiaryController,
  getDiaryController,
} from '../controllers/diaryController.js';
import { isValidDate, isValidEntry } from '../middlewares/isValid.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { productValidationWithDate } from '../validations/diary.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.get(
  '/:date',
  isValidDate,
  authenticate,
  ctrlWrapper(getDiaryController),
);

router.post(
  '/add',
  validateBody(productValidationWithDate), // Ürün validasyonu
  authenticate,
  ctrlWrapper(addDiaryController), // Controller wrapper
);
router.delete(
  '/:entryId/:date',
  isValidEntry,
  ctrlWrapper(deleteDiaryController),
);
export default router;
