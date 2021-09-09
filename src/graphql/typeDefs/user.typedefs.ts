import { gql } from 'apollo-server-koa';

const typeDefs = gql`
  enum QuestionType {
    SENSE
    GRAMMER
    ALGORITHM
  }

  type ScoreType {
    type: QuestionType!
    score: Int!
  }

  type CodingTestAnswer {
    section: Int!
    answerInfo: [ScoreType!]!
  }

  type MBTIResult {
    index: Int!
    type: String!
    title: String!
    studyType: [String!]!
    languageType: [String!]!
    studyContent: String!
    languageContent: String!
    surveyResult: [Int!]!
    userCount:Int!
  }

  type UserGrade {
    scores: [Int]!
    wrongAnswers: [Int]!
  }

  extend type Query {
    MBTIUser: Int! # MBTI 이용자에 대한 정보 불러오기 (이용자수)
    MBTIMax: [String]! # MBTI 테스트 결과의 최빈값
    MBTIMin: String! # MBTI 테스트 결과의 최소값
    CodingTestUser: Int! # CodingTest 이용자에 대한 정보 불러오기 (이용자수)
    CodingTestAverageScore(section: Int!): Float! # CodingTest 이용자에 대한 정보 불러오기 (평균)
    CodingTestTextAnswers : [String]! #CodingTest 주관식 정담 불러오기
    CodingTestTime : Int! #CodingTest 총 이용시간 구하기
  }

  extend type Mutation {
    updateMBTIResult(surveySelection: [Int!]!, selection: [Int!]!): MBTIResult!
    updateCodingTestResult(section: Int!, selection: [Int!]!, textAnswer: String!): UserGrade! #점수 반환
  }
`;

export { typeDefs as userTypeDefs };
