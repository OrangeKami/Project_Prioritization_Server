import express from "express";
import ticketsRouter from "./tickets.js";
import usersRouter from "./users.js";
import deadLineRouter from "./deadLine.js";
import commentsRouter from "./comments.js";

const router = express.Router();

router.use("/tickets", ticketsRouter);

router.use("/users", usersRouter);

router.use("/deadline", deadLineRouter);

router.use("/comments", commentsRouter);

export default router;
