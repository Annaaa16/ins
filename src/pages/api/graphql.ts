import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { buildSchema } from 'type-graphql';
import Cors from 'micro-cors';

// types
import { Context } from '~/types/context';

import UserResolver from '~/db/resolvers/user';
import connectToDb from '~/db/connectToDb';

connectToDb();

const cors = Cors({
  origin: 'https://studio.apollographql.com',
  allowCredentials: true,
});

const server = new ApolloServer({
  schema: await buildSchema({
    resolvers: [UserResolver],
  }),
  context: ({ req, res }): Context => ({ req, res }),
});

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();

    return false;
  }

  await startServer;

  await server.createHandler({ path: '/api/graphql' })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
