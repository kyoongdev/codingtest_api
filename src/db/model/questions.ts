import * as mongoose from 'mongoose';
import { QuestionContentType, Category, SelectionsType } from '@src/utils/enum';

interface ContentType extends mongoose.Document {
  type: number;
  text: string;
}

const contentSchema = new mongoose.Schema(
  {
    type: Number,
    text: { type: String, required: true },
  },
  { _id: false },
);

interface SelectionType extends mongoose.Document {
  type: number;
  text: string;
}

const selectionSchema = new mongoose.Schema({
  type: Number,
  text: { type: String, required: true },
})

// 질문 (MBTI + CodingTest)
interface QuestionsType extends mongoose.Document {
  section: number;
  types: number; // MBTI인가 CodingTest인가를 판단할 type
  point: number,
  index: number;
  content: ContentType; //  content가 img인지 text인지
  selection: Array<SelectionType>; // selection이 img인지 text인지
  shortAnswerQuestion: string;
}

const schema = new mongoose.Schema({
  section: Number,
  types: Number,
  point: Number,
  index: Number,
  content: { type: contentSchema },
  // content: contentSchema, // { type: 1, text: "...../image.png" } // a.content.text
  selection: { type: [selectionSchema] },
  shortAnswerQuestion: String,
});

const Questions = mongoose.model<QuestionsType>('questions', schema);
export { Questions };
