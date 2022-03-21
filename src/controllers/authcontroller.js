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
 return res.status(400).send({ message: "User with that email already exists" });

    let dimple = await User.create(req.body);

    let token = newToken(dimple);
    console.log(token)
    return res.render("index");
  } catch (err) {
    return res.render("error", {err});
  }
};
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
var c = localStorage.getItem("currentUser") || {};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors.array()) });
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).send({ message: "Either Email and password incorrect" });

    const match = user.checkPassword(req.body.password);

    if (!match) {
    let err = "Email or password is wrong"
    return res.render("error", { err });
    }                 
    const token = newToken(user);
    c= user;
    console.log(c);
    localStorage.setItem("currentUser",JSON.stringify(c))
    console.log(c)
    return res.render("index", {user});
  } catch (err) {
    console.log(err, "err")
    return res.render("error", {err});
  }
};

module.exports = { register, login };
