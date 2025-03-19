import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import {
  addDiaryController,
  deleteDiaryController,
  getDiaryController,
  updateDiaryController,
} from '../controllers/diaryController.js';
import { isValidDate, isValidEntry } from '../middlewares/isValid.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { productValidationWithDate } from '../validations/diary.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.get(
  '/:date',
  authenticate,
  isValidDate,
  ctrlWrapper(getDiaryController),
);

router.post(
  '/add',
  validateBody(productValidationWithDate),
  authenticate,
  ctrlWrapper(addDiaryController),
);

router.patch(
  '/:entryId',
  authenticate,
  validateBody(productValidationWithDate),
  isValidEntry,
  ctrlWrapper(updateDiaryController),
);
export default router;

router.delete(
  '/:entryId/:date',
  authenticate,
  isValidEntry,
  ctrlWrapper(deleteDiaryController),
);
