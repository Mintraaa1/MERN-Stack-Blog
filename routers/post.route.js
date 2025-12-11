const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const PostController = require("../controllers/post.controller");

// สร้างโพสต์
router.post("/post", auth, PostController.createPost);

// ดึงโพสต์ทั้งหมด
router.get("/posts", PostController.getAllPosts);

// ดึงโพสต์เดียว
router.get("/post/:id", PostController.getPostById);

// อัปเดตโพสต์
router.put("/post/:id", auth, PostController.updatePost);

// ลบโพสต์
router.delete("/post/:id", auth, PostController.deletePost);

module.exports = router;
