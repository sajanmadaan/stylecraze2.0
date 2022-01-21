require("dotenv").config();
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const { formatErrors } = require("../utils/validation");
const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors.array()) });
    }
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user)
      return res
        .status(400)
        .send({ message: "User with that email already exists" });

    user = await User.create(req.body);

    const token = newToken(user);

    return res.render("index");
  } catch (err) {
    return res.render("error", err);
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors.array()) });
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .send({ message: "Either Email and password incorrect" });

    const match = user.checkPassword(req.body.password);

    if (!match) {var err = "Email or password is wrong"
    return res.render("error", { err });}
    const token = newToken(user);
    return res.render("index", { user });
  } catch (err) {
    return res.render("error", err);
  }
};

module.exports = { register, login };
