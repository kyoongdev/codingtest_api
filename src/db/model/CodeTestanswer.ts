import * as mongoose from 'mongoose';
import { QuestionType } from '@src/utils/enum';

interface ScoreType extends mongoose.Document {
  type: number;
  score: number;
  answer: number;
} //

const ScoreTypeSchema = new mongoose.Schema(
  {
    type: Number,
    score: { type: Number, required: true },
    answer: { type: Number, required: true },
  },
  { _id: false },
);

export interface CodingTestAnswerType extends mongoose.Document {
  section: number;
  answerInfo: Array<ScoreType>; // 문제 답
}

const schema = new mongoose.Schema({
  section: Number,
  answerInfo: [ScoreTypeSchema],
});

const CodeTestAnswer = mongoose.model<CodingTestAnswerType>('answersCodeTest', schema);
export { CodeTestAnswer };
