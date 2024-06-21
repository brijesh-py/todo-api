import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controllers.js";
import {
  checkLogin,
  checkRegister,
} from "../middlewares/required.middlewares.js";

const authRouter = Router();
authRouter.route("/register").post(checkRegister, registerUser);
authRouter.route("/login").post(checkLogin, loginUser);

export { authRouter };
