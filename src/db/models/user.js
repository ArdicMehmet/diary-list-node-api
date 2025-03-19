import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      email: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String, // Refresh token saklamak için alan
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Kullanıcı kaydedilmeden önce şifreyi hash'le
usersSchema.pre('save', async function (next) {
  console.log('şifre hashlanıyor');
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Şifre doğrulama fonksiyonu
usersSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JSON dönüşümünde şifre ve refresh token'ı gizle
usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
