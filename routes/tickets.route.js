import express from "express";
const router = express.Router();
import { validate } from "../middleware/validate.middleware.js";

import {
  getAllMyTickets,
  getSubmittedTickets,
  createTicket,
  getSingleTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticket.controller.js";

router
  .get("/myTickets", getAllMyTickets) // * get all my tickets submitted and unsubmitted

  .get("/submitted", getSubmittedTickets) // * get submitted tickets

  .post("/new", validate("ticketVali"), createTicket) // * create a single ticket

  .get("/:id", getSingleTicket) // * get a single ticket 

  .delete("/:id", deleteTicket) //  * delete a single ticket

  .put("/:id", validate("ticketVali"), updateTicket); // * update a single ticket

export default router;
