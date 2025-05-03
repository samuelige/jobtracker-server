import { loginController, registerController } from "@/controllers/auth.controller";
import { Router } from "express";

const authRoutes = Router();

authRoutes.route('/register').post(registerController);
authRoutes.route('/login').post(loginController);

export default authRoutes;