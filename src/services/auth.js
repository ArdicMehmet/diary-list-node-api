import { UsersCollection } from '../db/models/user.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { SessionsCollection } from '../db/models/session.js';
import dotenv from 'dotenv';
//import { config } from '../config.js';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../constants/index.js';

dotenv.config();

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
  try {
    const user = await UsersCollection.findOne({ email });
    if (!user) {
      return { error: true, statusCode: 404, message: 'Kullanıcı bulunamadı' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: true, statusCode: 401, message: 'Şifre hatalı' };
    }

    // **Yeni Token Üret**
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // **Token Geçerlilik Süreleri**
    const accessTokenValidUntil = new Date(
      Date.now() + ACCESS_TOKEN_EXPIRATION,
    );
    const refreshTokenValidUntil = new Date(
      Date.now() + REFRESH_TOKEN_EXPIRATION,
    );

    // **Eski session'ları temizle**
    await SessionsCollection.deleteMany({ userId: user._id });

    // **Yeni session oluştur**
    await SessionsCollection.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil,
      refreshTokenValidUntil,
    });

    return {
      accessToken,
      accessTokenValidUntil,
      date: new Date(),

      refreshToken,
      refreshTokenValidUntil, // ✅ Refresh Token süresi de ekleniyor!
    };
  } catch (error) {
    console.error('🚨 Login sırasında hata:', error);
    return {
      error: true,
      statusCode: 500,
      message: 'Sunucu hatası',
      details: error,
    };
  }
};

// **Çıkış (Logout)**
export const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    return { error: true, statusCode: 400, message: 'Token eksik' };
  }

  const session = await SessionsCollection.findOne({ refreshToken });
  if (!session) {
    return { error: true, statusCode: 404, message: 'Session bulunamadı' };
  }

  // **Session'ı sil**
  await SessionsCollection.deleteOne({ _id: session._id });

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
