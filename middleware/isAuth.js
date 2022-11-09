import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    // ! find user with the _id from the User database
    req.user = await User.findOne({ _id });
    next();
  } catch (err) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};



