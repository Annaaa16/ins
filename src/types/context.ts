import { NextApiRequest, NextApiResponse } from 'next';

export interface Context {
  req: NextApiRequest & { userId: string };
  res: NextApiResponse;
}
