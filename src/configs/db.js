const mongoose = require("mongoose");

require("dotenv").config();

module.exports = () => {
  return mongoose.connect("mongodb+srv://3dsajan:byesonali@cluster0.xyikr.mongodb.net/stylecraze");
};
