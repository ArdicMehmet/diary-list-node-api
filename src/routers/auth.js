import express from 'express';
import {
  register,
  login,
  logout,
  refreshToken,
  addUserInfoController,
  getUserController,
} from '../controllers/authController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { userInfoValidation } from '../validations/auth.js';

const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get the authenticated user's information
 *     description: This endpoint returns the information of the currently authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information
 *       401:
 *         description: Unauthorized, if no valid token is provided
 */
router.get('/user', authenticate, ctrlWrapper(getUserController));

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register by providing their details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, if input is invalid
 */
router.post('/register', ctrlWrapper(register));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with credentials
 *     description: This endpoint allows a user to log in by providing username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Unauthorized, if credentials are incorrect
 */
router.post('/login', ctrlWrapper(login));

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Refresh token
 *     description: This endpoint is used to refresh the JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       400:
 *         description: Bad request, if the refresh token is invalid
 */
router.post('/token', ctrlWrapper(refreshToken));

/**
 * @swagger
 * /userInfo:
 *   patch:
 *     summary: Update user's personal information
 *     description: This endpoint allows the authenticated user to update their personal information.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       400:
 *         description: Bad request, if the input is invalid
 *       401:
 *         description: Unauthorized, if no valid token is provided
 */
router.patch(
  '/userInfo',
  authenticate,
  validateBody(userInfoValidation),
  ctrlWrapper(addUserInfoController),
);

/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: Logout and invalidate the token
 *     description: This endpoint logs out the user by invalidating the JWT token.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized, if no valid token is provided
 */
router.delete('/logout', ctrlWrapper(logout));

export default router;
