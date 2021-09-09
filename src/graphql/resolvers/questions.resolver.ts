import { IResolvers, ApolloError } from 'apollo-server-koa';
import { ApolloContext, Query } from '../types';
import { Category } from '@src/utils/enum';
import isNull from 'lodash';

//Query
const getQuestions: Query<{ types: Category; section: number }> = async (
  p,
  { types, section },
  { db },
) => {
  console.log(types);
  if (!types) {
    throw new ApolloError('Category Input Error');
  }

  const questions = await db.Questions.find({ types: types, section: section });

  return questions;
};

const ShortAnswersQuestion: Query<void> = async (p, args, { db }) => {
  const shortAnswer = await db.Questions.findOne({ index: 13 });
  console.log(shortAnswer);
  if (!shortAnswer) {
    throw new ApolloError('fail to read shrotAnswer  : getShortAnswerQuestion');
  }

  return shortAnswer.shortAnswerQuestion;
}
const resolvers: IResolvers<any, ApolloContext> = {
  Query: {
    getQuestions: getQuestions,
    ShortAnswersQuestion: ShortAnswersQuestion,
  },
};

export { resolvers as questionsResolver };
