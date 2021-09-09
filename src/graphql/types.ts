import { DB } from '@src/db/mongoose';
import { GraphQLResolveInfo } from 'graphql';

export type ApolloContext = {
  db: DB;
};

export type Query<T> = (parent: any, args: T, ctx: ApolloContext, info: GraphQLResolveInfo) => any;
