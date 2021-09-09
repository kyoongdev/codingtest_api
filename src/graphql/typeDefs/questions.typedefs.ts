import { gql } from 'apollo-server-koa';

const typeDefs = gql`

  type Questions {
    section: Int
    types: Int
    index: Int
    point : Int
    content: ContentType
    selection: [ContentType]
    shortAnswerQuestion : String
  }

  type ContentType {
    type: Int!
    text: String!
  }

 

  extend type Query {
    getQuestions(types: Int!, section: Int!): [Questions]! #문제 불러오기 -> Category별로 MBTI or Coding_Test
    ShortAnswersQuestion : String! #주관식 문제
  }
`;

export { typeDefs as questionsTypeDefs };
