import express from "express";
const router = express.Router();
import { signUp, signIn } from "../controllers/authController.js";
import { validate } from "../middleware/validateMiddleware.js";


router
  .post("/signUp", validate("signUp"), signUp) // * sign up users
  .post("/signIn", validate("signIn"), signIn); // * sign in users
//   todo forgot password
// todo resetpassword

export default router;
