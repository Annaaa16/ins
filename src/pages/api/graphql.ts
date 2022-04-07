import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { buildSchema, Field, ID, ObjectType, Query, Resolver } from 'type-graphql';
import Cors from 'micro-cors';

const cors = Cors();

@ObjectType()
class Dog {
  @Field(() => ID)
  name!: string;
}

@Resolver()
class DogsResolver {
  @Query(() => [Dog])
  dogs(): Dog[] {
    return [{ name: 'Hung' }];
  }
}

const server = new ApolloServer({
  schema: await buildSchema({
    resolvers: [DogsResolver],
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();

    return false;
  }

  await startServer;

  await server.createHandler({ path: '/api/graphql' })(req, res);
});
