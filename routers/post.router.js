const express = require("express");
const router = express.Router();
const userController = require("../controllers/post.controller");

//http://localhost:5000/api/v1/post
router.post("/", userController.createPost);

//http://localhost:5000/api/v1/get
router.get("", userController.getPosts);

// GET http://localhost:5000/api/v1/post/1
router.get("/:id", userController.getById);

// GET http://localhost:5000/api/v1/author/1
router.get("/author/:id", userController.getByAuthorId);


module.exports = router;
