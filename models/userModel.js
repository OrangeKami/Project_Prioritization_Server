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

userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password
) {
  // *check email exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  // hash passowrd
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  return user;
};

userSchema.statics.signin = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid password");
  }

  return user;
};


export default mongoose.model("User", userSchema);
