import express from 'express';
import {
  register,
  login,
  logout,
  refreshToken,
  addUserInfoController,
} from '../controllers/authController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { userInfoValidation } from '../validations/auth.js';

const router = express.Router();

router.post('/register', ctrlWrapper(register));
router.post('/login', ctrlWrapper(login));
router.post('/logout', ctrlWrapper(logout));
router.post('/token', ctrlWrapper(refreshToken));

router.patch(
  '/userInfo',
  authenticate,
  validateBody(userInfoValidation),
  ctrlWrapper(addUserInfoController),
);
export default router;
