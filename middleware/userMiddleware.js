import { check } from "express-validator";

export const validate = (method) => {
  switch (method) {
    case "signUp": {
      return [
        check(["firstName", "lastName", "email", "password"])
          .not()
          .isEmpty()
          .withMessage("All fields are required"),

        check("email")
          .isEmail()
          .withMessage("invalid email address")
          .normalizeEmail(),

        check("password")
          .isLength({ min: 8, max: 15 })
          .withMessage(
            "your password should have min and max length between 8-15"
          )
          .matches(/\d/)
          .withMessage("your password should have at least one number")
          .matches(/[!@#$%^&*(),.?":{}|<>]/)
          .withMessage(
            "your password should have at least one sepcial character"
          ),

        check("confirmPassword").custom((value, { req }) => {
          if (value !== req.body.password) {
            console.log(req.body.password, req.body.confirmPassword);
            throw new Error("confirm password does not match");
          }
          return true;
        }),
      ];
    }

    case "signIn": {
      return [
        check(["email", "password"])
          .not()
          .isEmpty()
          .withMessage("All fields are required"),
      ];
    }

    case "updateInfo": {
      return [
        check(["firstName", "lastName", "email"])
          .not()
          .isEmpty()
          .withMessage("All fields are required"),

        check("email")
          .isEmail()
          .withMessage("invalid email address")
          .normalizeEmail(),
      ];
    }
  }
};
