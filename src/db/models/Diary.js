import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
  calories: { type: Number, required: true },
});

const summarySchema = new mongoose.Schema({
  left: { type: Number, required: true },
  consumed: { type: Number, required: true },
  dailyRate: { type: Number, required: true },
  percentOfDailyRate: { type: Number, required: true },
});

const diarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  date: { type: String, required: true }, // YYYY-MM-DD
  summary: summarySchema,
  products: [productSchema],
});

export default mongoose.model('Diary', diarySchema);
