import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../constants/index.js';

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, config.accessTokenSecret, {
    expiresIn: ACCESS_TOKEN_EXPIRATION / 1000 + 's', // Milisaniyeyi saniyeye çevir
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, config.refreshTokenSecret, {
    expiresIn: REFRESH_TOKEN_EXPIRATION / 1000 + 's', // Milisaniyeyi saniyeye çevir
  });
};
