import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isManager: { type: Boolean, default: false },

    // todo future support
    //   avatar: { type: String},
  },
  { timestamps: true }
);



export default mongoose.model("User", userSchema);
