import express from "express";
const router = express.Router();
import { signUp, signIn } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";

router
  .post("/signUp", validate("signUp"), signUp) // * sign up users
  .post("/signIn", validate("signIn"), signIn); // * sign in users
//   todo future function forgot password
// todo futuere function resetpassword

export default router;
