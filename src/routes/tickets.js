import express from "express";
const router = express.Router();

//  * get all tickets
router.get("/", (req, res) => {
  res.json({ message: "All Tickets" });
});
// * create a single ticket
router.post("/", (req, res) => {
  res.json({ message: "Create Ticket" });
});
// * get single tickets from
router.get("/:id", (req, res) => {
  res.json({ message: "Single Ticket" });
});

//  * delete a single ticket
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete Ticket" });
});
// * update a single ticket
router.put("/:id", (req, res) => {
  res.json({ message: "Update Ticket" });
});

export default router;
