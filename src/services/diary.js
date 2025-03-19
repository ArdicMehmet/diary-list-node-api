import Diary from '../db/models/Diary.js';

export const getAllDiary = async (date, userId) => {
  const diary = await Diary.findOne({ date, userId });

  if (!diary) {
    return false;
  }
  return diary;
};

export const addProductDiary = async (
  date,
  user,
  product,
  dailyRate = 2000,
) => {
  const userId = user.userId; // kontrol et, gelen veriden id yi nasıl aldığına
  // Daily Rate 10 * ağırlık + 6,25 * boy - 5 * yaş - 161 - 10 * (ağırlık - istenen ağırlık)
  // user dan gelicek ağırlık ve boy bilgileri
  const diary = await Diary.findOne({ userId, date });
  if (diary) {
    diary.products.push(product);
    const totalCalories = diary.products.reduce(
      (sum, product) => sum + product.calories,
      0,
    );
    diary.summary.consumed = totalCalories;
    diary.summary.left = diary.summary.dailyRate - totalCalories;
    diary.summary.percentOfDailyRate =
      (totalCalories / diary.summary.dailyRate) * 100;

    await diary.save();
    return true;
  } else {
    const consumed = product.calories;
    const left = dailyRate - consumed;
    const percentOfDailyRate = (consumed / dailyRate) * 100;

    const newDiary = new Diary({
      userId,
      date,
      products: [product],
      summary: {
        left,
        consumed,
        dailyRate,
        percentOfDailyRate,
      },
    });

    await newDiary.save();
    return true;
  }
};

export const updateProductInDiary = async (userId, entryId, product) => {
  const { title, weight, calories, date } = product;

  const diary = await Diary.findOneAndUpdate(
    { userId, date, 'products._id': entryId }, // userId ve products içindeki _id eşleşmeli
    {
      $set: {
        'products.$.title': title,
        'products.$.weight': weight,
        'products.$.calories': calories,
      },
    },
    { new: true }, // Güncellenmiş dökümanı almak için
  );

  if (!diary) {
    throw new Error('Ürün veya günlük kaydı bulunamadı!');
  }

  // Yeni toplam kaloriyi hesapla
  const totalCalories = diary.products.reduce((sum, p) => sum + p.calories, 0);
  diary.summary.consumed = totalCalories;
  diary.summary.left = diary.summary.dailyRate - totalCalories;
  diary.summary.percentOfDailyRate =
    (totalCalories / diary.summary.dailyRate) * 100;

  await diary.save();
  return diary;
};

export const deleteProductDiary = async (userId, date, productId) => {
  const result = await Diary.updateOne(
    { userId, date },
    { $pull: { products: { _id: productId } } },
  );

  if (result.modifiedCount === 0) {
    return false;
  }
  return true;
};
