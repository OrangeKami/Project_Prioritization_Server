//  ! checking role of the user, if manager can process next route
export const checkRole = (req, res, next) => {
  try {
    // * test req.user info
    // console.log(req.user)

    const role = req.user.role; // * grant the role after isAuth middleware
    if (role == "manager") {
      next();
    } else {
      return res.status(403).json({ message: "Not Authorized" });
    }
  } catch (err) {
    next(err);
  }
};
