import express from "express";
const router = express.Router();
import {checkRole} from "../middleware/userMiddleware.js";



router
  .route("/:ticketid/feedbacks")
  .get((req, res) => {
    res.json({ message: "all feedbacks" });
  })
  .post(checkRole,(req, res) => {
    res.json({ message: "all feedbacks" });
  });

router
  .route("/:ticketid/feedbacks/:feedbackid",checkRole)
  .patch((req, res) => {
    res.json({ message: "updater feedbacks" });
  })
  .delete((req, res) => {
    res.json({ message: "delete feedbacks" });
  });

  
export default router;


