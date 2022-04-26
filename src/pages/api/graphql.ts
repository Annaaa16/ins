import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { buildSchema } from 'type-graphql';
import Cors from 'micro-cors';

// types
import { Context } from '~/db/types/context';

import AuthResolver from '~/db/resolvers/auth';
import PostResolver from '~/db/resolvers/post';
import CommentResolver from '~/db/resolvers/comment';
import connectToDb from '~/db/connectToDb';
import UserResolver from '~/db/resolvers/user';

connectToDb();

const cors = Cors({
  origin: 'https://studio.apollographql.com',
  allowCredentials: true,
});

const server = new ApolloServer({
  schema: await buildSchema({
    resolvers: [AuthResolver, UserResolver, PostResolver, CommentResolver],
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
