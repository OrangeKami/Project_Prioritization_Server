import express from 'express';
import mongoose from "mongoose";
import Ticket from '../models/ticketModel.js';

//  ! get all tickets 
export const getAllTickets = async (req, res) => {
    try {
        const  tickets = await Ticket.find();
        res.status(200).json(tickets)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

// ! get all submitted tickets
export const getSubmittedTickets = async (req, res) => {
  try {
    const submittedTickets = await Ticket.find({isSubmitted: true});
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
        res.status(200).json(ticket)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

// ! create new Ticket
export const createTicket = async (req, res) => {

    const newTicket = new Ticket({
        initialtive: req.body.initialtive,
        description: req.body.description,
        impact: req.body.impact,
        confidence: req.body.confidence,
        effort: req.body.effort, 
        isSubmitted: req.body.isSubmitted,
    })
    try {
         await newTicket.save();
        res.status(200).json(newTicket);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

// ! update Ticket
export const updateTicket = async (req, res) => {
    const {id} = req.params;
    const {initialtive, description, impact,effort,confidence, isSubmitted} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    const updateTicket = {
      initialtive,
      description,
      impact,
      effort,
      confidence,
      _id: id
    };
    await Ticket.findByIdAndUpdate(id, updateTicket, {new: true});
    res.json(updateTicket)
}

// ! delet Ticket
export const deleteTicket = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    await Ticket.findByIdAndRemove(id);
    res.json({ message:"Ticket deleted successfully"})
}
