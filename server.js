const app = require("./index");


app.listen(2545, async () => {
  try {
    console.log("listening on port 2545");
  } catch (e) {
    console.log(e.message);
  }
});
