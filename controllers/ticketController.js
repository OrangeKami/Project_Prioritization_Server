import mongoose from "mongoose";
import Ticket from "../models/ticketModel.js";
import Ice from "../models/iceModel.js";

//  ! get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("ice");
    res.status(200).json(tickets);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ! get all submitted tickets
export const getSubmittedTickets = async (req, res) => {
  try {
    const submittedTickets = await Ticket.find({ isSubmitted: true });
    res.status(200).json(submittedTickets);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ! get single ticket
export const getSingleTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id).populate("ice");
    res.status(200).json(ticket);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ! create new Ticket
export const createTicket = async (req, res) => {
  console.log(req.body);
  const newIce = new Ice({
    impact: req.body.impact,
    effort: req.body.effort,
    confidence: req.body.confidence,
  });

  // * create new Ice
  try {
    await newIce.save();
    res.status(200).json(newIce);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  // * after ice save use its _id as ObjectId to ticket get Ice and Ticket Data nested
  const newTicket = new Ticket({
    initialtive: req.body.initialtive,
    description: req.body.description,
    ice: newIce._id,
    isSubmitted: req.body.isSubmitted,
  });

  try {
    await newTicket.save();
    res.status(200).json(newTicket);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

  // const newTicket = new Ticket({
  //     initialtive: req.body.initialtive,
  //     description: req.body.description,
  //     impact: req.body.impact,
  //     confidence: req.body.confidence,
  //     effort: req.body.effort,
  //     isSubmitted: req.body.isSubmitted,
  // })
  // try {
  //      await newTicket.save();
  //     res.status(200).json(newTicket);
  // } catch (err) {
  //     res.status(500).json({error:err.message});
  // }
};

// ! update Ticket
// ? need to be efficent (Use 2 find method)
export const updateTicket = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No ticket with id: ${id}`);
  const ticket = await Ticket.findById(id);
  const updateTicket = {
    initialtive: req.body.initialtive,
    description: req.body.description,
    ice: {
      impact: req.body.impact,
      confidence: req.body.confidence,
      effort: req.body.effort,
      _id: ticket.ice,
    },
    _id: id,
  };
  await Ticket.findByIdAndUpdate(id, updateTicket, { new: true });
  res.json(updateTicket);
};

// ! delet Ticket
export const deleteTicket = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await Ticket.findByIdAndRemove(id);
  res.json({ message: "Ticket deleted successfully" });
};
