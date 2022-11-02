import express from "express";
const router = express.Router();

import {
  getAllTickets,
  getSubmittedTickets,
  createTicket,
  getSingleTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

// ? need to change to get all submited ticket later
router.get("/", getAllTickets);

// todo get submitted tickets
router.get("/submitted", getSubmittedTickets);

// * create a single ticket
router.post("/new", createTicket);

// * get single tickets from
router.get("/:id", getSingleTicket);

//  * delete a single ticket
router.delete("/:id", deleteTicket);

// * update a single ticket
router.put("/:id", updateTicket);

export default router;
