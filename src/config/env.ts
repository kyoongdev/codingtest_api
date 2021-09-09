import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

interface Config {
  APP: 'development' | 'production' | 'test' | string;
  NODE_ENV: 'development' | 'production' | 'test' | string;
  DB_CODETEST: string;
  DB_NAME: string;
}

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'devleopment',
  APP: process.env.APP || 'devlopment',
  DB_CODETEST: process.env.DB_CODETEST || '',
  DB_NAME: process.env.DB_NAME || '',
};

if (config.NODE_ENV === 'development') {
  console.log(config);
}
export default { config };
