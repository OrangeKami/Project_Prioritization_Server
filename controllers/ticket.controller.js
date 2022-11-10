import Ticket from "../models/ticket.model.js";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

//  ! get all my tickets with submitted and no sumitted
export const getAllMyTickets = async (req, res) => {
  try {
    // * find user id after isAuth middleware
    const tickets = await Ticket.find({ author: req.user.id }).populate(
      "author"
    );
    res.status(200).json(tickets);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ! get all submitted tickets
export const getSubmittedTickets = async (req, res) => {
  try {
    const submittedTickets = await Ticket.find({ isSubmitted: true }).populate(
      "author"
    );
    res.status(200).json(submittedTickets);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ! get single ticket
export const getSingleTicket = async (req, res) => {
  const { id } = req.params;
  // * check params id is valid mongoose objective id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Ticket" });
  }

  try {
    const ticket = await Ticket.findById(id).populate("author");
    res.status(200).json(ticket);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ! create new Ticket
export const createTicket = async (req, res) => {
  try {
    // * for test only
    // console.log(req.user._id);
    // Finds the validaiton errores in this requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    const ticket = req.body;
    ticket.author = req.user._id;
    const newTicket = await Ticket.create(ticket);
    res.status(200).json(newTicket);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ! update Ticket

export const updateTicket = async (req, res) => {
  const { id } = req.params;
  // * check params id is valid mongoose objective id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Ticket" });
  }
  await Ticket.findByIdAndUpdate(id, req.body, { new: true });
  res.json(req.body);
};

// ! delete Ticket
export const deleteTicket = async (req, res) => {
  const { id } = req.params;
  // * check params id is valid mongoose objective id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Ticket" });
  }
  await Ticket.findByIdAndRemove(id);
  res.json({ message: "Ticket deleted successfully" });
};
