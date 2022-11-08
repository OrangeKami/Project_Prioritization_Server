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

// Using bcrypt middleware
userSchema.pre("save", async function(next) {
  if (this.isModified('password'))
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// schema method to compare Password
userSchema.methods.comparePassword= async function(inputPassword) {
  const match = await bcrypt.compare(inputPassword, this.password);
  return !match ? false : true;
}

export default mongoose.model("User", userSchema);
