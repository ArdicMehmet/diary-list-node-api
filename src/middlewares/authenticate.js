// import createHttpError from 'http-errors';

// import { SessionsCollection } from '../models/session';
// import { UsersCollection } from '../models/user';
import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Yetkisiz erişim, token eksik' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: 'Geçersiz token' });
    }

    // **Token'daki user ID ile veritabanından gerçek kullanıcıyı alıyoruz**
    const user = await UsersCollection.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    console.log('Auth USER ---', user);

    req.user = user; // Kullanıcıyı req.user içine gömüyoruz!
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token doğrulama başarısız', error });
  }
};
// const authHeader = req.get('Authorization');

// if (!authHeader) {
//   next(createHttpError(401, 'Please provide Authorization header'));
//   return;
// }
// const bearer = authHeader.split(' ')[0];
// const token = authHeader.split(' ')[1];

// if (bearer !== 'Bearer' || !token) {
//   next(createHttpError(401, 'Auth header should be of type Bearer'));
//   return;
// }

// const session = await SessionsCollection.findOne({ accessToken: token });

// if (!session) {
//   next(createHttpError(401, 'Session not found!'));
//   return;
// }

// const isAccessTokenExpired =
//   new Date() > new Date(session.accessTokenValidUntil);

// if (isAccessTokenExpired) {
//   next(createHttpError(401, 'Access token expired'));
// }

// const user = await UsersCollection.findById(session.userId);

// if (!user) {
//   next(createHttpError(401));
//   return;
// }
// req.user = user;
