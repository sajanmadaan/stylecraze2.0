const express = require("express");
const app = express();
const port = 5000;
const indexController = require("./controllers/index.controller");
app.set("view engine", "ejs");
app.use("/", indexController);
app.listen(port, () => {
  console.log("Listening on port " + port);
});
