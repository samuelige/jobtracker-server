import mongoose from 'mongoose';
import logger from './logger';
import { envConfig } from '@/config/env.config';

export async function databaseConnect(): Promise<void> {
  try {
    await mongoose.connect(envConfig.DB_DATABASE_URL);
    logger.info('MongoDB connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to MongoDB.', error);
  }
}