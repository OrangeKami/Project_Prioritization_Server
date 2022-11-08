import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

// * creating jwt token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// * sign up users
export const signUpUser = async (req, res) => {
  try {
    // Finds the validaiton errores in this requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    // *check is email exist
    const { email } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      throw Error("Email already in use");
    }

    const newUser = await User.create(req.body);

    const token = createToken(newUser._id);

    res.status(200).json({ newUser, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// * sign in users
export const signInUser = async (req, res) => {
  try {
    // Finds the validaiton errores in this requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
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
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  * update users
export const updateUser = async (req, res) => {
  try {
    // Finds the validaiton errores in this requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;

    await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(req.body);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// *get user details
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// *get all users info
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ! delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndRemove(id);
  res.json({ message: "User deleted successfully" });
};
