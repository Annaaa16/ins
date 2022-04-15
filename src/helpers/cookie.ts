import { NextApiResponse } from 'next';

import { ServerResponse } from 'http';
import cookie from 'cookie';

import { COOKIE_NAMES } from '~/constants';
import cookieConfig from '~/configs/cookie';

interface Cookie {
  key: string;
  value: string;
}

export const setCookie = (res: NextApiResponse | ServerResponse, payload: Cookie | Cookie[]) => {
  if (Array.isArray(payload)) {
    res.setHeader(
      'Set-Cookie',
      payload.map((c) =>
        cookie.serialize(c.key, c.value, {
          ...cookieConfig,
        }),
      ),
    );
  } else {
    res.setHeader('Set-Cookie', cookie.serialize(payload.key, payload.value, cookieConfig));
  }
};

export const clearAllCookies = (res: NextApiResponse | ServerResponse) => {
  res.setHeader(
    'Set-Cookie',
    Object.values(COOKIE_NAMES).map((key) =>
      cookie.serialize(key, '', {
        ...cookieConfig,
        expires: new Date(0),
      }),
    ),
  );
};
