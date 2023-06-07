const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Pangolin = require("../models/pangolin");

router.post("/register", async (req, res) => {
  try {
    let pangolin = new Pangolin({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });

    console.log("Received data:", req.body);

    pangolin = await pangolin.save();

    console.log("Saved pangolin:", pangolin);

    res.send(pangolin);
  } catch (error) {
    console.error("Error while saving pangolin:", error);
    res.status(500).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("Received data:", req.body);

  let pangolin = await Pangolin.findOne({ username: req.body.username });
  console.log("Found pangolin:", pangolin);

  if (!pangolin) return res.status(400).send("Invalid username.");

  const validPassword = await bcrypt.compare(
    req.body.password,
    pangolin.password
  );
  console.log("Password validation result:", validPassword);

  if (!validPassword) return res.status(400).send("Invalid password.");

  const token = jwt.sign(
    { _id: pangolin._id, role: pangolin.role },
    "jwtPrivateKey"
  );
  console.log("Generated token:", token);

  res.send({
    token: token,
    pangolin: { _id: pangolin._id, role: pangolin.role },
  });
});

router.put("/role", async (req, res) => {
  try {
    const pangolin = await Pangolin.findById(req.body.id);
    if (!pangolin) return res.status(404).send("Pangolin not found.");

    pangolin.role = req.body.role;
    await pangolin.save();

    res.send(pangolin);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/addFriend", async (req, res) => {
  try {
    const pangolin = await Pangolin.findById(req.body.id);
    const friend = await Pangolin.findById(req.body.friendId);

    if (!pangolin || !friend)
      return res.status(404).send("Pangolin or friend not found.");

    pangolin.friends.push(friend);
    await pangolin.save();

    res.send(pangolin);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/removeFriend", async (req, res) => {
  try {
    const pangolin = await Pangolin.findById(req.body.id);
    const friend = await Pangolin.findById(req.body.friendId);

    if (!pangolin || !friend)
      return res.status(404).send("Pangolin or friend not found.");

    pangolin.friends = pangolin.friends.filter(
      (f) => f.toString() !== friend._id.toString()
    );
    await pangolin.save();

    res.send(pangolin);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", (req, res) => {
  Pangolin.findById(req.params.id)
    .populate("friends")
    .then((pangolin) => {
      if (!pangolin) {
        return res.status(404).send("Pangolin not found.");
      }
      console.log("Le pangolin" + pangolin);
      res.send(pangolin);
    })
    .catch((error) => {
      res.status(500).send("Server error.");
    });
});

module.exports = router;
