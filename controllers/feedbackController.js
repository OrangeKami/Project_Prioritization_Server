import Feedback from "../models/feedbackModel.js";

// * get all feedbacks under ticketId
export const getAllFeedbacks = async (req, res) => {
  try {
    const findFeedback = await Feedback.find({
      ticketId: req.params.ticketid,
    })
      .populate("ticketId")
      .populate("feedbackBy"); // * get ticket id from params
    res.status(200).json({ findFeedback });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// * create a new Feedback
export const postFeedback = async (req, res) => {
  try {
    // * for test
    // console.log(req.user)
    // console.log(req.params)
    const feedback = req.body;
    // * add ticketId to feedback
    feedback.ticketId = req.params.ticketid;
    // * add userId to feedback
    feedback.feedbackBy = req.user.id;

    const newFeedback = await Feedback.create(feedback);
    res.status(200).json(newFeedback);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// * update a feedback
export const updateFeedback = async (req, res) => {
  await Feedback.findByIdAndUpdate(req.params.feedbackid, req.body, {
    new: true,
  });
  res.json(req.body);
};


// * delete a feedback
export const deleteFeedback = async (req, res) => {
    await Feedback.findByIdAndRemove(req.params.feedbackid)
    res.json({message: "Feedback delet successfully"})
}