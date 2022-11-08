import Ticket from "../models/ticketModel.js";
import Ice from "../models/iceModel.js";

//  ! get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
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
    const ticket = await Ticket.findById(id);
    res.status(200).json(ticket);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ! create new Ticket
export const createTicket = async (req, res) => {
  try {
    const newTicket = await Ticket.create(req.body);

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
  const ticket = await Ticket.findById(id);
  
  await Ticket.findByIdAndUpdate(id, req.body, { new: true });
  res.json(req.body);
};

// ! delet Ticket
export const deleteTicket = async (req, res) => {
  const { id } = req.params;
  await Ticket.findByIdAndRemove(id);
  res.json({ message: "Ticket deleted successfully" });
};
