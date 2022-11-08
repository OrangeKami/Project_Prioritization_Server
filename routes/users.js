import express from "express";
const router = express.Router();
import { validate } from "../middleware/validateMiddleware.js";
import {
  signUpUser,
  signInUser,
  updateUser,
  getUser,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";

//  * get user
router
  .route("/:id")
  .get(getUser)
  .put(validate("updateInfo"), updateUser)
  .delete(deleteUser); // todo delete user may for test only 

// * user sign up
router.post("/sign-up", validate("signUp"), signUpUser);

// * user login
router.post("/sign-in", validate("signIn"), signInUser);

//  * get all users
// ? for test only
router.get("/", getAllUsers);



export default router;
