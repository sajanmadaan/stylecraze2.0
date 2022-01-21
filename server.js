const app = require("./index");

const connect = require("./src/configs/db")


app.listen(2545, async () => {
  try {
    await connect();
    console.log("listening on port 2545");
  } catch (e) {
    console.log(e.message);
  }
});
