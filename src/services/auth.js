import { UsersCollection } from '../db/models/user.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// **Kullanıcı Kayıt (Register)**
export const registerUser = async (name, email, password) => {
  const existingUser = await UsersCollection.findOne({ email });
  if (existingUser) {
    throw new Error('E-posta zaten kayıtlı');
  }

  const newUser = new UsersCollection({ name, email, password });
  await newUser.save();

  return { message: 'Kullanıcı kaydı başarılı' };
};

// **Kullanıcı Giriş (Login)**
export const loginUser = async (email, password) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Şifre hatalı');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

// **Çıkış (Logout)**
export const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('Token eksik');
  }

  const user = await UsersCollection.findOne({ refreshToken });
  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  user.refreshToken = null;
  await user.save();

  return { message: 'Çıkış başarılı' };
};

// **Token Yenileme (Refresh Token)**
export const refreshTokenUser = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('Token eksik');
  }

  const user = await UsersCollection.findOne({ refreshToken });
  if (!user) {
    throw new Error('Geçersiz refresh token');
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decoded) {
    throw new Error('Token geçersiz');
  }

  const newAccessToken = generateAccessToken(user);
  return { accessToken: newAccessToken };
};
