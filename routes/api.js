import express from "express";
import ticketsRouter from "./tickets.js";
import usersRouter from "./users.js";
import feedbacksRouter from "./feedbacks.js";
import authRouter from "./auth.js";
import {isAuth} from "../middleware/isAuth.js"
const router = express.Router();

router
  .use("/auth", authRouter)

  .use("/tickets", isAuth, ticketsRouter, feedbacksRouter)

  .use("/users", isAuth, usersRouter);

export default router;
