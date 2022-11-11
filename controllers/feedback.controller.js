import Feedback from "../models/feedback.model.js";
import mongoose from "mongoose";

// * get all feedbacks under ticketId
export const getAllFeedbacks = async (req, res) => {
  const { ticketid } = req.params;

  // * check params id is valid mongoose objective id
  if (!mongoose.Types.ObjectId.isValid(ticketid)) {
    return res.status(404).json({ error: "No such Ticket" });
  }

  try {
    const findFeedback = await Feedback.find({
      ticketId: ticketid,
    })
      .populate({
        path: "ticketId",
        populate: {
          path: "author",
        },
      })
      .populate("feedbackBy");
    res.status(200).json({ findFeedback });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// * create a new Feedback
export const postFeedback = async (req, res) => {
  const { ticketid } = req.params;

  // * check params id is valid mongoose objective id
  if (!mongoose.Types.ObjectId.isValid(ticketid)) {
    return res.status(404).json({ error: "No such Ticket" });
  }

  try {
    // * for test
    // console.log(req.user)
    // console.log(req.params)
    const feedback = req.body;
    // * add ticketId to feedback
    feedback.ticketId = ticketid;
    // * add userId to feedback
    feedback.feedbackBy = req.user.id;

    const newFeedback = await Feedback.create(feedback);
    res.status(200).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// * update a feedback
export const updateFeedback = async (req, res) => {
  const { feedbackid } = req.params;

  // * check params id is valid mongoose objective id
  if (!mongoose.Types.ObjectId.isValid(feedbackid)) {
    return res.status(404).json({ error: "No such Feedback" });
  }

  await Feedback.findByIdAndUpdate(feedbackid, req.body, {
    new: true,
  });
  res.status(200).json(req.body);
};

// * delete a feedback
export const deleteFeedback = async (req, res) => {
  const { feedbackid } = req.params;

  // * check params id is valid mongoose objective id
  if (!mongoose.Types.ObjectId.isValid(feedbackid)) {
    return res.status(404).json({ error: "No such Feedback" });
  }
  await Feedback.findByIdAndRemove(feedbackid);
  res.json({ message: "Feedback deleted successfully" });
};
