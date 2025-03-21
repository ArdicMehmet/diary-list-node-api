import express from 'express';
import {
  register,
  login,
  logout,
  refreshToken,
} from '../controllers/authController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.post('/register', ctrlWrapper(register));
router.post('/login', ctrlWrapper(login));
router.post('/logout', ctrlWrapper(logout));
router.post('/token', ctrlWrapper(refreshToken));

export default router;
