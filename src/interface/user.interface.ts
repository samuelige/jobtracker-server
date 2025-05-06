import mongoose from "mongoose";

export interface IUserDocument extends mongoose.Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  location: string;
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  location?: string;
}

export interface IUser_Login {
  email: string;
  password: string;
}