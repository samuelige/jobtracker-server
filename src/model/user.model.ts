import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { envConfig } from '@/config/env.config';
import { IUserDocument } from '@/interface/user.interface';

const user = {
  first_name: {
    type: mongoose.Schema.Types.String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  last_name: {
    type: mongoose.Schema.Types.String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
    minlength: 6,
  },
  location: {
    type: mongoose.Schema.Types.String,
    trim: true,
    maxlength: 20,
    default: 'my city',
  },
} as const;

const userSchema = new mongoose.Schema(user);

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(envConfig.JWT_SALT)
  this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, first_name: this.first_name, last_name: this.last_name},
    envConfig.JWT_SECRET,
    {
      expiresIn: envConfig.JWT_LIFETIME,
    }
  )
};

userSchema.methods.comparePassword = async function (canditatePassword: string) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

export default mongoose.model<IUserDocument>('User', userSchema);
