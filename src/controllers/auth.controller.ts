import User from "@/model/user.model";
import { AuthService } from "@/services/auth.service";
import { BadRequestError, UnauthenticatedError } from "@/utils/errors";
import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

const authService = new AuthService();

export const registerController = async (req:Request, res: Response) => {
  const user = await authService.create({...req.body});
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({user: {name: user.first_name}, token});
};

export const loginController = async (req:Request, res: Response) => {
  const user = await authService.login({...req.body});
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user:{name:user.first_name}, token})
};
