const express = require("express");
const test = express.Router();

test.get("/", async (req, res) => {
  let test = new Object();
  test.id = "??";

  return res.status(200).send({ test });
});
module.exports = { test };
