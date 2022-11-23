import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

// * creating jwt token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// * /sigup path,  password hashed in userSchema middleware, role is user as default
export const signUp = async (req, res) => {
  try {
    // Finds the validaiton errors in this requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // *check whether email exists or not
    const { email } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      throw Error("Email already in use");
    } else {
      const newUser = await User.create(req.body);

      const token = createToken(newUser._id);

      res.status(200).json({ newUser, token });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// * sign in users. Find valid email, check the password then create a new token
export const signIn = async (req, res) => {
  try {
    // Finds the validaiton errors in this requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Incorrect email");
    }

    const match = await user.comparePassword(password);
    if (!match) {
      throw Error("Invalid password");
    }
    // *create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


