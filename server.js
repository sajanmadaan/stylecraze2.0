const app = require("./index");
const env = require("dotenv");

const connect = require("./src/configs/db")

app.listen(process.env.PORT||2545, async () => {
  try {
    await connect();
    console.log("listening on port 2545");
  } catch (e) {
    console.log(e.message);
  }
});
