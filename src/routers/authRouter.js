import express from "express";
import { singInValidation } from "../middlewares/singInValidationMiddleware.js";
import { singUpValidation } from "../middlewares/singUpValidationMiddleware.js";
import { signIn, signUp } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post(`/signup`, singUpValidation, signUp);

authRouter.post(`/signin`, singInValidation, signIn);

export { authRouter };
