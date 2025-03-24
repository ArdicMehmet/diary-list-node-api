import { env } from './utils/env.js';

export const config = {
  accessTokenSecret: env('ACCESS_TOKEN_SECRET', 'default_secret'),
  refreshTokenSecret: env('REFRESH_TOKEN_SECRET', 'default_refresh_secret'),
  accessTokenExpires: env('ACCESS_TOKEN_EXPIRES', '15m'),
  refreshTokenExpires: env('REFRESH_TOKEN_EXPIRES', '7d'),
};
