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
  .post(checkRole,postFeedback); //! check role

router
  .route("/:ticketid/feedbacks/:feedbackid", checkRole) // ! check role is == "manager"
  .patch(updateFeedback)
  .delete(deleteFeedback);

  
export default router;


