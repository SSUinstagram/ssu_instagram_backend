const express = require("express");
const cors = require("cors");
const app = express();
const { test } = require("./routes");
app.use("/test", test);
// app.use(cors({origin="http://localhost:3000/"}))

app.listen(8029, async () => {
  console.log("server listening on port  8029");
});
