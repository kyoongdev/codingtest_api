import * as mongoose from 'mongoose';

export interface SubmitCodingTestType extends mongoose.Document {
  section: number;
  selection: [number]; // 사용자의 답안지
  score: number; // 사용자의 점수
  textAnswer: string;
  grade: string;
  time : number;
}

const schema = new mongoose.Schema(
  {
    section: Number,
    selection: [Number],
    score: Number,
    textAnswer: String,
    grade : String,
    time:Number,
  },
  {
    timestamps: { currentTime: () => new Date() },
  },
);

const CodeTestSubmit = mongoose.model<SubmitCodingTestType>('codetestsubmit', schema);
export { CodeTestSubmit };
