import express from "express";
const router = express.Router();
import {checkRole} from "../middleware/userMiddleware.js";
import {
  postFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";


router
  .route("/:ticketid/feedbacks")
  .get(getAllFeedbacks)
  .post(checkRole,postFeedback);

router
  .route("/:ticketid/feedbacks/:feedbackid", checkRole)
  .patch(updateFeedback)
  .delete(deleteFeedback);

  
export default router;


