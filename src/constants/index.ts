export const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@instagram-clone.ho9r4.mongodb.net/instagram-clone?retryWrites=true&w=majority`;

export const SALT_ROUNDS = 10;

export const SECRETS = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET,
};

export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

export const EXPIRES = {
  ACCESS_TOKEN: 7 * 24 * 60 * 60, // 7 days (by seconds)
  REFRESH_TOKEN: 14 * 24 * 60 * 60, // 14 days (by seconds)
};

export const __prod__ = process.env.NODE_ENV === 'production';

export const FACEBOOK_CLIENT_ID = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const PATHS = {
  HOME: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  CHANGE_PASSWORD: '/change-password',
};
