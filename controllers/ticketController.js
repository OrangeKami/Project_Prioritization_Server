import Ticket from "../models/ticketModel.js";

//  ! get all tickets
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
  await Ticket.findByIdAndUpdate(id, req.body, { new: true });
  res.json(req.body);
};

// ! delete Ticket
export const deleteTicket = async (req, res) => {
  const { id } = req.params;
  await Ticket.findByIdAndRemove(id);
  res.json({ message: "Ticket deleted successfully" });
};
