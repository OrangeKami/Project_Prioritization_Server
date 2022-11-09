import express from "express";
const router = express.Router();
import {checkRole} from "../middleware/userMiddleware.js";
import {postFeedback} from "../controllers/feedbackController.js";


router
  .route("/:ticketid/feedbacks")
  .get((req, res) => {
    res.json({ message: "all feedbacks" });
  })
  .post(checkRole,postFeedback);

router
  .route("/:ticketid/feedbacks/:feedbackid",checkRole)
  .patch((req, res) => {
    res.json({ message: "updater feedbacks" });
  })
  .delete((req, res) => {
    res.json({ message: "delete feedbacks" });
  });

  
export default router;


