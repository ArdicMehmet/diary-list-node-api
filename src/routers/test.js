import express from 'express';
import { authenticate } from '../middlewares/authenticate.js'; // Middleware ile token doğrulama
import { UsersCollection } from '../db/models/user.js';

const router = express.Router();

router.get('/auth-test', authenticate, async (req, res) => {
  try {
    const user = await UsersCollection.findById(req.user._id).select(
      '-password',
    );
    res.json({
      message: '✅ Auth Test Başarılı!',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: '❌ Sunucu hatası', error });
  }
});

export default router;
