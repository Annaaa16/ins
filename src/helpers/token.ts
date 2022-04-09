import { NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';

import { COOKIE_NAMES, EXPIRES, SECRETS } from '~/constants';
import { setCookie } from './cookie';

const generateToken = (type: 'accessToken' | 'refreshToken', userId: string) => {
  if (!SECRETS.ACCESS_TOKEN || !SECRETS.REFRESH_TOKEN) throw new Error('Secret token not found');

  return jwt.sign(
    { userId },
    type === 'accessToken' ? SECRETS.ACCESS_TOKEN : SECRETS.REFRESH_TOKEN,
    {
      expiresIn: type === 'accessToken' ? EXPIRES.ACCESS_TOKEN : EXPIRES.REFRESH_TOKEN,
    },
  );
};

export const setTokens = (res: NextApiResponse, userId: string) => {
  setCookie(res, [
    {
      key: COOKIE_NAMES.ACCESS_TOKEN,
      value: generateToken('accessToken', userId),
    },
    {
      key: COOKIE_NAMES.REFRESH_TOKEN,
      value: generateToken('refreshToken', userId),
    },
  ]);
};
