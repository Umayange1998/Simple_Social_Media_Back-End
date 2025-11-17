const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY; 
const authenticateToken = require("../middleware/AuthMiddleware");
// Check if user exists
router.get("/check/:username", async (req, res) => {
   try {
    const { username } = req.params;
    const user = await Users.findOne({ where: { username } });
    res.json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


//register user
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ error: "Username exists" });

    const hash = await bcrypt.hash(password, 10);
    await Users.create({ username, password: hash });
    res.json({ message: "SUCCESS" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


//login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Logged in", token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


/////////////////////////////////////        Update user          ////////////////////////////////////////////////////////
router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { username, password } = req.body;

    if (userId !== req.user.id) return res.status(403).json({ error: "Cannot update other user" });

    const user = await Users.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const updatedData = {};
    if (username && username !== user.username) {
      const existingUser = await Users.findOne({ where: { username } });
      if (existingUser) return res.status(400).json({ error: "Username exists" });
      updatedData.username = username;
    }
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    await Users.update(updatedData, { where: { id: userId } });
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;