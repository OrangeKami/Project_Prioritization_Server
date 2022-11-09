import Feedback from "../models/feedbackModel.js";

// * get all feedbacks under ticketId
export const getAllFeedbacks = async (req, res) => {
  try {
    const findFeedback = await Feedback.find({
      ticketId: req.params.ticketId,
    }).populate('ticketId').populate('feedbackBy'); // * get ticket id from params
    res.status(200).json({ findFeedback });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const postFeedback = async (req, res) => {
   try{ // * for test
    // console.log(req.user)
    // console.log(req.params)
    const feedback = req.body
    // * add ticketId to feedback
    feedback.ticketId = req.params.ticketid;
    // * add userId to feedback
    feedback.feedbackBy = req.user.id;

    const newFeedback = await Feedback.create(feedback);
    res.status(200).json(newFeedback);
   } catch (err) {
    res.status(404).json({ message: err.message });
   }
}