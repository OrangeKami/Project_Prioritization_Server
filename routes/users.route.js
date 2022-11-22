import express from "express";
import { validate } from "../middleware/validate.middleware.js";
const router = express.Router();
import {
  updateUser,
  getUser,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller.js";

//  * get user
router
  .route("/:id")
  .get(getUser)
  .patch(validate("updateUser"), updateUser )
  .delete(deleteUser); // todo delete user may for test only

//  * get all users
// ? for test and admin only
router.get("/", getAllUsers);

export default router;
