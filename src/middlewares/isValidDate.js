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
