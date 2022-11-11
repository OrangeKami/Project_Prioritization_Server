import express from "express";
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
  .patch(updateUser)
  .delete(deleteUser); // todo delete user may for test only

//  * get all users
// ? for test only
router.get("/", getAllUsers);

export default router;
