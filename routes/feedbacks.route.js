import express from "express";
const router = express.Router();
import { checkRole } from "../middleware/user.middleware.js";
import {
  postFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedback.controller.js";

router
  .route("/:ticketid/feedbacks")
  .get(getAllFeedbacks)
  .post(checkRole, postFeedback); //! check role

router
  .route("/:ticketid/feedbacks/:feedbackid", checkRole) // ! check role is == "manager"
  .patch(updateFeedback)
  .delete(deleteFeedback);

export default router;
