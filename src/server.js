import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routers/authRouter.js";
import { urlRouter } from "./routers/urlRouter.js";
import { userRouter } from "./routers/userRouter.js";

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
server.use(authRouter);
server.use(urlRouter);
server.use(userRouter);
server.listen(process.env.PORT, () => {
  console.log(`Listen on the ${process.env.PORT}`);
});
