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
  .get("/myTickets", getAllMyTickets) // ? need to change to get all submited ticket later

  .get("/submitted", getSubmittedTickets) // * get submitted tickets

  .post("/new", validate("ticketVali"), createTicket) // * create a single ticket

  .get("/:id", getSingleTicket) // * get single tickets from

  .delete("/:id", deleteTicket) //  * delete a single ticket

  .put("/:id", validate("ticketVali"), updateTicket); // * update a single ticket

  
export default router;
