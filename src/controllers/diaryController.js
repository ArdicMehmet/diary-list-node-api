import { getAllDiary } from '../services/diary.js';

export const getDiaryController = async (req, res) => {
  const { date } = req.params;
  const userId = req.user.id; // JWT ya da session'dan gelecek olan id

  const diary = await getAllDiary(date, userId);
  if (!diary) {
    return res.status(404).json({ message: 'No diary found for this date.' });
  }
  res.json(diary);
};
