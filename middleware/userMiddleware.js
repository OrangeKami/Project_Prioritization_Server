import User from '../models/userModel.js';


//  ! checking role of the user, if manager can process next route
const checkRole = (req, res, next) => {
    if (req.role == 'manager') {
        next();
    } else {
        return res.status(403).json({message:"Not Authorized"})
    }
};

