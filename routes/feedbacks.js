import express from "express";
const router = express.Router();

router
  .route("/:ticketid/feedbacks")
  .get((req, res) => {
    res.json({ message: "all feedbacks" });
  })
  .post((req, res) => {
    res.json({ message: "all feedbacks" });
  });

router
  .route("/:ticketid/feedbacks/:feedbackid")
  .patch((req, res) => {
    res.json({ message: "updater feedbacks" });
  })
  .delete((req, res) => {
    res.json({ message: "delete feedbacks" });
  });

  
export default router;


