import express from "express";
const router = express.Router();
import { validate } from "../middleware/userMiddleware.js";
import { signUpUser, signInUser, updateUser, getUser, getAllUsers,deleteUser } from "../controllers/userController.js"

//  * get user
router.get("/:id", getUser);

// * user sign up
router.post("/sign-up", validate('signUp'), signUpUser);


// * user login
router.post("/sign-in", validate('signIn'), signInUser);

// * user update
router.put("/:id", validate("updateInfo"), updateUser);

//  * get all users
// ? for test only
router.get("/", getAllUsers);

// * delete user
// ? test only
router.delete("/:id", deleteUser);
export default router;
