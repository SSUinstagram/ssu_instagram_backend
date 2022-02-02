const express = require("express");
const User = require("../../models/user");
const Follow = require("../../models/follow");
const { sequelize } = require("../../models/user");

const Follows = express.Router();

Follows.get("/user", async (req, res) => {
  try {
    const user = await User.findAll({ attributes: ["id"] });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
});

Follows.get("/table", async (req, res) => {
  try {
    let { user_id } = req.query;
    console.log(user_id);
    const result = await Follow.findAll({
      where: { following_id: user_id },
      attributes: { exclude: ["number"] },
    });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
});

Follows.post("/update", async (req, res) => {
  try {
    console.log(req.query);
    let { following_id, followed_id, state } = req.body;
    console.log(following_id, followed_id, state);
    if (!state) {
      const result = await Follow.create({
        following_id: following_id,
        followed_id: followed_id,
      });
      return res.status(200).json(result);
    } else {
      const result = await Follow.destroy({
        where: { following_id: following_id, followed_id: followed_id },
      });
      console.log(result);
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

Follows.get("/getFollowingNum", async (req, res) => {
  const { user_id } = req.query;
  console.log(user_id);
  query = `SELECT count(*) FROM follow WHERE following_id=${user_id}`;
  try {
    const result = await Follow.count({ where: { following_id: user_id } });
    console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
});

Follows.get("/getFollowedNum", async (req, res) => {
  const { user_id } = req.query;
  console.log(user_id);
  query = `SELECT count(*) FROM follow WHERE following_id=${user_id}`;
  try {
    const result = await Follow.count({ where: { followed_id: user_id } });
    console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = { Follows };
