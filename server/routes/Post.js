const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const authenticateToken = require("../middleware/AuthMiddleware");

//create post 
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, postText } = req.body;
    const post = await Posts.create({ title, postText, userId: req.user.id });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});



//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});



////////////////////////////          Update Post               //////////////////////////
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Posts.findOne({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.userId !== req.user.id) return res.status(403).json({ error: "Cannot update others' posts" });

    await Posts.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Post updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// ////////////////////////////          Delete Post             //////////////////////////// 
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Posts.findOne({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.userId !== req.user.id) return res.status(403).json({ error: "Cannot delete others' posts" });

    await Posts.destroy({ where: { id: req.params.id } });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;