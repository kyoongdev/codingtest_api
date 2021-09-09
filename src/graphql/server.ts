import { config } from '../config/env';
import { Constants } from '../config/constants';
import { Context } from 'koa';
import { ApolloServer, gql, makeExecutableSchema, IResolvers } from 'apollo-server-koa';
import { DB } from '@src/db/mongoose';
import { ApolloContext } from './types';
import { questionsTypeDefs, userTypeDefs } from './typeDefs';
import { questionsResolver, userResolver } from './resolvers';
import { merge } from 'lodash';

const typedefs = gql`
  type Query {
    _version: String!
  }
  type Mutation {
    _sample: String!
  }
`;

const resolver: IResolvers = {
  Query: {
    _version: () => Constants.VERSION,
  },
  Mutation: {
    _sample: () => 'Sample Mutation',
  },
};

const schema = makeExecutableSchema({
  typeDefs: [typedefs, questionsTypeDefs, userTypeDefs],
  resolvers: merge(resolver, questionsResolver, userResolver),
});

function init(db: DB) {
  return new ApolloServer({
    debug: config.NODE_ENV === Constants.ENV_DEVELOPMENT,
    introspection: true,
    playground: true,
    schema,
    context: async ({ ctx }: { ctx: Context }): Promise<ApolloContext | undefined> => ({
      db,
    }),
  });
}

export const apolloServer = { init };
