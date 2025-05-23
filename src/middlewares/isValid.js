import mongoose from 'mongoose';
import dayjs from 'dayjs';
export const isValidDate = (req, res, next) => {
  const { date } = req.params;
  if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) {
    return res
      .status(400)
      .json({ error: 'Invalid date format or value. Use YYYY-MM-DD.' });
  }
  next();
};

export const isValidEntry = (req, res, next) => {
  const { entryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(entryId)) {
    return res.status(400).json({ error: 'Geçerli product id girilmedi' });
  }
  next();
};

export const isValidProductId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Geçerli id girilmedi' });
  }
  next();
};
