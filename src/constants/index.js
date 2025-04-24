import { env } from '../utils/env.js';

// Sabit zaman değerleri
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000; // 15 dakika
export const ONE_HOUR = 60 * 60 * 1000; // 1 saat
export const ONE_DAY = 24 * ONE_HOUR; // 1 gün

// **.env içindeki token sürelerini milisaniyeye çevir**
const parseTime = (timeString) => {
  const unit = timeString.slice(-1); // Son harfi al (m, h, d)
  const value = parseInt(timeString.slice(0, -1)); // Sayıyı al

  switch (unit) {
    case 'm':
      return value * 60 * 1000; // Dakika -> Milisaniye
    case 'h':
      return value * 60 * 60 * 1000; // Saat -> Milisaniye
    case 'd':
      return value * 24 * 60 * 60 * 1000; // Gün -> Milisaniye
    default:
      throw new Error(`Geçersiz süre formatı: ${timeString}`);
  }
};

export const PAGES = {
  size: 30,
};
// **Token geçerlilik süreleri**
export const ACCESS_TOKEN_EXPIRATION = parseTime(
  env('ACCESS_TOKEN_EXPIRES', '15m'),
);
export const REFRESH_TOKEN_EXPIRATION = parseTime(
  env('REFRESH_TOKEN_EXPIRES', '7d'),
);
