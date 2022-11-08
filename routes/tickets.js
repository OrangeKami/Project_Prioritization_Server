import express from "express";
const router = express.Router();
import { validate } from "../middleware/validateMiddleware.js";

import {
  getAllMyTickets,
  getSubmittedTickets,
  createTicket,
  getSingleTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

// ? need to change to get all submited ticket later
router.get("/myTickets", getAllMyTickets);

// todo get submitted tickets
router.get("/submitted", getSubmittedTickets);

// * create a single ticket
router.post("/new",validate("ticketVali"), createTicket);

// * get single tickets from
router.get("/:id", getSingleTicket);

//  * delete a single ticket
router.delete("/:id", deleteTicket);

// * update a single ticket
router.put("/:id",validate("ticketVali"), updateTicket);

export default router;
