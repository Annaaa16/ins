import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { buildSchema } from 'type-graphql';
import Cors from 'micro-cors';

import UserResolver from '~/db/resolvers/user';
import connectToDb from '~/db/connectToDb';

connectToDb();

const cors = Cors();

const server = new ApolloServer({
  schema: await buildSchema({
    resolvers: [UserResolver],
  }),
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
