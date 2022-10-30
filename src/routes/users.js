import express from "express";
const router = express.Router();

//  * get all users 
router.get("/", (req, res) => {
  res.json({ message: "All Users" });
});

// * user sign up
router.post("/sign-up", (req, res) => {
    res.json({ message: "User register"})
});

// * user login
router.post("/sign-in", (req, res) => {
    res.json({ message: "User login"})
})

// * user update
router.put("/:id", (req, res) => {
    res.json({ message: "User update"})
})

export default router;
