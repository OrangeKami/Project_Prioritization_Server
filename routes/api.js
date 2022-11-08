import express from "express";
import ticketsRouter from "./tickets.js";
import usersRouter from "./users.js";
import feedbacksRouter from "./feedbacks.js";
import deadLineRouter from "./deadLine.js";


const router = express.Router();

router.use("/tickets", ticketsRouter, feedbacksRouter);

router.use("/users", usersRouter);


router.use("/deadline", deadLineRouter); // todo future function

export default router;
