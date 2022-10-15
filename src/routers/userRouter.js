import express from "express";
import { usersMe, ranking } from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get(`/users/me`, usersMe);
userRouter.get(`/ranking`, ranking);

export { userRouter };
