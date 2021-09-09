import * as mongoose from 'mongoose';

export interface MBTIResultType extends mongoose.Document {
  index: number;
  type: string;
  title: string;
  studyType: Array<string>;
  languageType: Array<string>;
  studyContent: string;
  languageContent: string;
  userCount: number;
  surveyResult: Array<number>;
  //6크기의 배열
  //0,1,2 => survey1 문제의 1번 2번 3번 선택 수
  //3,4,5 => survey2 문제의 1번 2번 3번 선택 수
}

const schema = new mongoose.Schema(
  {
    index: Number,
    type: String,
    title: String,
    studyType: [String],
    languageType: [String],
    studyContent: String,
    languageContent: String,
    userCount: Number,
    surveyResult: [Number],
  },
  {
    timestamps: { currentTime: () => new Date() },
  },
);

const MBTIResult = mongoose.model<MBTIResultType>('MBTIResult', schema);
export { MBTIResult };
