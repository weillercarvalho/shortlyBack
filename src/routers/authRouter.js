import express from "express";
import { singInValidation } from "../middlewares/singInValidationMiddleware.js";
import { singUpValidation } from "../middlewares/singUpValidationMiddleware.js";
import { singIn, singUp } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post(`/singup`, singUpValidation, singUp);

authRouter.post(`/singin`, singInValidation, singIn);

export { authRouter };
