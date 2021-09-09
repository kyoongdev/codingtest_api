import { IResolvers, ApolloError } from 'apollo-server-koa';
import { isNull } from 'lodash';
import { ApolloContext, Query } from '../types';
import scorePermute from '../../utils/scorePermute';
import gradePermute from '../../utils/gradePermute';

type UserGrade = {
  scores: Array<number>;
  wrongAnswers: Array<number>;
};

//Query

const MBTIMax: Query<void> = async (p, args, { db }) => {
  const data = await db.MBTIResult.find().sort({ userCount: -1 });

  if (!data) {
    throw new ApolloError('Fail to read data : (getMaxMBTI)');
  }

  return data[0].type;
};

const MBTIMin: Query<void> = async (p, args, { db }) => {
  const data = await db.MBTIResult.find().sort({ userCount: 1 });

  if (!data) {
    throw new ApolloError('Fail to read data : (getMaxMBTI)');
  }

  return data[0].type;
};



const MBTIUser: Query<void> = async (p, args, { db }) => {
  const MBTIresult = await db.MBTIResult.find();
  if (isNull(MBTIresult)) {
    throw new ApolloError('Fail to Read userCount : (getUserCountTotal)');
  }
  console.log(MBTIresult);
  let userCount: number = 0;
  for (let i = 0; i < MBTIresult.length; i++) {
    userCount += MBTIresult[i].userCount;
  }
  return userCount;
};

//총이용자수
const CodingTestUser: Query<void> = async (p, args, { db }) => {
  const userCount = await db.CodeTestSubmit.countDocuments({});

  if (isNull(userCount)) {
    throw new ApolloError('UserCount Error : (CodingTestUser)');
  }

  return userCount;
};

//해당 section Grade출력
const CodingTestAverageScore: Query<{ section: number }> = async (p, { section }, { db }) => {
  if (isNull(section)) {
    throw new ApolloError('section input failed : (CodingTestAverage)');
  }

  const sectionScore = await db.CodeTestSubmit.find({ section });
  if (isNull(sectionScore)) {
    throw new ApolloError('Fail to Read Score : (CodingTestAverage)');
  }

  let average: number = 0;
  for (let i = 0; i < sectionScore.length; i++) {
    average += sectionScore[i].score;
  }

  return average / sectionScore.length;
};

const CodingTestTextAnswers: Query<void> = async (p, args, { db }) => {
  const textAnswers = await db.CodeTestSubmit.find();
  if (isNull(textAnswers)) {
    throw new ApolloError('fail to read textAnswers : (CodingTestTextAnswers)');
  }
  const textAnswerlist: Array<string> = textAnswers.map(data => data.textAnswer);
  return textAnswerlist;
};

const CodingTestTime: Query<void> = async (p, args, { db }
) => {
  const times = await db.CodeTestSubmit.find().sort({ timestamps: -1 });
  if (isNull(times)) {
    throw new ApolloError("fail to read times : (CodingTestTime)");
  }
  let time: number = 0;

  times.forEach((v, i) => {
    time += v.time;
  })

  return time;
}

//Mutaion

//MBTI결과값 저장
const updateMBTIResult: Query<{
  surveySelection: Array<number>;
  selection: Array<number>;
}> = async (p, { surveySelection, selection }, { db }) => {
  let resultId: number = 0;
  let scoreM: number = 0;
  let scoreB: number = 0;
  let scoreT: number = 0;
  let scoreI: number = 0;
  let i: number = 0;

  for (i = 0; i < 13; i = i + 4) {
    scoreM += selection[i];
    scoreB += selection[i + 1];
    scoreT += selection[i + 2];
    scoreI += selection[i + 3];
  }

  resultId = scorePermute(scoreM, scoreB, scoreT, scoreI);

  const MBTIresult = await db.MBTIResult.findOne({ index: resultId });
  if (!MBTIresult) {
    throw new ApolloError('fail to read MBTIresult : (updateMBTIResult)');
  }


  MBTIresult.userCount++;
  MBTIresult.surveyResult[surveySelection[0]]++;
  MBTIresult.surveyResult[surveySelection[1] + 3]++;

  await MBTIresult.save();

  return MBTIresult;
};

//CodingTest 채점 결과 및 답안저장
const updateCodingTestResult: Query<{
  section: number;
  selection: Array<number>;
  textAnswer: String;
  time: number;
}> = async (p, { section, selection, textAnswer, time }, { db }) => {
  if (isNull(textAnswer)) {
    throw new ApolloError('TextAnswer input failed : (updateCodingTestResult)');
  }
  if (isNull(section)) {
    throw new ApolloError('section input failed : (updateCodingTestResult)');
  }
  if (isNull(time)) {
    throw new ApolloError('time input failed : (updateCodingTestResult)');
  }

  const answers = await db.CodeTestAnswer.findOne({ section: section });
  if (isNull(answers)) {
    throw new ApolloError('Fail to read Answers : (updateCodingtest)');
  }
  if (isNull(selection) || selection.length !== answers.answerInfo.length) {
    throw new ApolloError('selection input failed : (updateCodingTestResult)');
  }

  let userGrade: UserGrade = { scores: [0], wrongAnswers: [0] };
  let score: number = 0;
  //TODO: userGrade 초기화 방식 확인 필요
  for (let i = 0; i < answers.answerInfo.length; i++) {
    if (selection[i] === answers.answerInfo[i].answer) {
      score += answers.answerInfo[i].score;
      userGrade.scores[answers.answerInfo[i].type] += answers.answerInfo[i].score;
    } else {
      userGrade.wrongAnswers[answers.answerInfo[i].type]++;
    }
  }

  let grade: string = gradePermute(score);
  const lastTime = await db.CodeTestSubmit.find().sort({ timestamps: -1 });
  time += lastTime[0].time;

  const userResult = new db.CodeTestSubmit({
    section,
    selection,
    score,
    textAnswer,
    grade,
    time,
  });

  await userResult.save();

  return userGrade;
};

const resolver: IResolvers<any, ApolloContext> = {
  Query: {
    MBTIUser: MBTIUser,
    MBTIMax: MBTIMax,
    CodingTestUser: CodingTestUser,
    CodingTestAverageScore: CodingTestAverageScore,
    CodingTestTextAnswers: CodingTestTextAnswers,
    CodingTestTime: CodingTestTime,
    MBTIMin: MBTIMin,
  },
  Mutation: {
    updateCodingTestResult: updateCodingTestResult,
    updateMBTIResult: updateMBTIResult,
  },
};

export { resolver as userResolver };
