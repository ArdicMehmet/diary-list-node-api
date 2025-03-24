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

/**
 * @swagger
 * /diary/{date}:
 *   get:
 *     summary: Get diary entry for a specific date
 *     description: This endpoint returns the diary entry for a given date.
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         description: The date of the diary entry (format YYYY-MM-DD)
 *         schema:
 *           type: string
 *           example: "2025-03-24"
 *           pattern: "^\\d{4}-\\d{2}-\\d{2}$"
 *     responses:
 *       200:
 *         description: The diary entry for the specified date
 *       401:
 *         description: Unauthorized, if no valid token is provided
 *       404:
 *         description: Diary entry not found for the given date
 */

router.get(
  '/:date',
  authenticate,
  isValidDate,
  ctrlWrapper(getDiaryController),
);

/**
 * @swagger
 * /diary/add:
 *   post:
 *     summary: Add a new diary entry
 *     description: This endpoint allows the authenticated user to add a new diary entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2025-03-24"
 *               content:
 *                 type: string
 *                 example: "Today I felt great!"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Diary entry added successfully
 *       400:
 *         description: Bad request, if the input is invalid
 *       401:
 *         description: Unauthorized, if no valid token is provided
 */
router.post(
  '/add',
  validateBody(productValidationWithDate),
  authenticate,
  ctrlWrapper(addDiaryController),
);

/**
 * @swagger
 * /diary/{entryId}:
 *   patch:
 *     summary: Update an existing diary entry
 *     description: This endpoint allows the authenticated user to update an existing diary entry.
 *     parameters:
 *       - in: path
 *         name: entryId
 *         required: true
 *         description: The ID of the diary entry to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated entry content"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Diary entry updated successfully
 *       400:
 *         description: Bad request, if the input is invalid
 *       401:
 *         description: Unauthorized, if no valid token is provided
 *       404:
 *         description: Diary entry not found for the given entryId
 */
router.patch(
  '/:entryId',
  authenticate,
  validateBody(productValidationWithDate),
  isValidEntry,
  ctrlWrapper(updateDiaryController),
);

/**
 * @swagger
 * /diary/{entryId}/{date}:
 *   delete:
 *     summary: Delete a diary entry for a specific date
 *     description: This endpoint allows the authenticated user to delete a specific diary entry for a given date.
 *     parameters:
 *       - in: path
 *         name: entryId
 *         required: true
 *         description: The ID of the diary entry to delete
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         description: The date of the diary entry (format YYYY-MM-DD)
 *         schema:
 *           type: string
 *           example: "2025-03-24"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Diary entry deleted successfully
 *       400:
 *         description: Bad request, if the input is invalid
 *       401:
 *         description: Unauthorized, if no valid token is provided
 *       404:
 *         description: Diary entry not found for the given entryId and date
 */
router.delete(
  '/:entryId/:date',
  authenticate,
  isValidEntry,
  ctrlWrapper(deleteDiaryController),
);

export default router;
