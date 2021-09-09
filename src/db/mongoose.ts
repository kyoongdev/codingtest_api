import mongoose from 'mongoose';
import * as model from './model';
import { config } from '../config/env';

mongoose.Promise = global.Promise;

export function createDB() {
  mongoose
    .connect(config.DB_CODETEST, {
      dbName: config.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('DB connected');
    })
    .catch(err => {
      throw new Error('Error : ' + err.message);
    });
  return model;
}

export type DB = ReturnType<typeof createDB>;
