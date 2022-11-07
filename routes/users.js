import express from "express";
const router = express.Router();
import { validate } from "../middleware/userMiddleware.js";
import { signUpUser } from "../controllers/userController.js"

//  * get all users 
router.get("/", (req, res) => {
  res.json({ message: "All Users" });
});

// * user sign up
router.post("/sign-up", validate('createUser'), signUpUser);


// * user login
router.post("/sign-in", (req, res) => {
    res.json({ message: "User login"})
})

// * user update
router.put("/:id", (req, res) => {
    res.json({ message: "User update"})
})

export default router;
