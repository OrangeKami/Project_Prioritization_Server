import express from "express";
import ticketsRouter from "./tickets.js";

const router = express.Router();

router.use("/tickets", ticketsRouter);

export default router;
