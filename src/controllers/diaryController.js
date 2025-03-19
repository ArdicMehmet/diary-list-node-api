import {
  addProductDiary,
  deleteProductDiary,
  getAllDiary,
  updateProductInDiary,
} from '../services/diary.js';
export const getDiaryController = async (req, res) => {
  const { date } = req.params;
  const userId = req.user.id; // JWT ya da session'dan gelecek olan id

  const diary = await getAllDiary(date, userId);
  if (!diary) {
    return res.status(404).json({
      data: null,
      message: 'No diary found for this date.',
      success: false,
    });
  }
  res.json(diary);
};

export const addDiaryController = async (req, res) => {
  const { title, weight, calories, date } = req.body;
  const user = req.user;
  console.log('İçerde');

  await addProductDiary(date, user, { title, weight, calories });
  return res.status(201).json({
    success: true,
    message: 'Ürün başarıyla eklendi.',
    data: { title, weight, calories, date },
  });
};

export const updateDiaryController = async (req, res) => {
  const { entryId } = req.params;
  const product = req.body;
  const userId = req.user.id;
  const result = await updateProductInDiary(userId, entryId, product);
  res.status(200).json({
    message: 'Ürün başarıyla güncellendi.',
    data: result,
  });
};

export const deleteDiaryController = async (req, res) => {
  const { entryId, date } = req.params;
  const user = req.user;
  const userId = user.id;
  const result = await deleteProductDiary(userId, date, entryId);

  if (!result) {
    return res
      .status(404)
      .json({ success: false, message: 'Eşleşen veri bulunamadı', data: null });
  }

  return res.status(200).json({
    success: true,
    message: `${entryId} id li ürün başarıyla silindi.`,
    data: null,
  });
};
