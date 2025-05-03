import dotenv from 'dotenv';
import { cleanEnv, str, port, } from 'envalid';

dotenv.config();

export const envConfig = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  PORT: port({ default: 5000 }),
  DB_DATABASE_URL: str(),
  CLIENT_URL: str(),
});