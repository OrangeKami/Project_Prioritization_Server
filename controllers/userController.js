import User from "../models/userModel.js"
import { validationResult } from "express-validator";

export const signUpUser = async (req, res,next) => {
   
   try {
    // Finds the validaiton errores in this requests
    const  errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
    }
    const { firstName, lastName, email, password } = req.body;

    const user = await User.signup(firstName, lastName, email, password);

    res.status(200).json(user);
   } catch (err) {
    res.status(400).json({error: err.message});
   }
};


export const signInUser = async (req, res, next) => {
    
}
