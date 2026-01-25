const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const postController = require("../controllers/post.controller");
const authJwt = require("../middleware/authJWT.middleware");

//http://localhost:5000/api/v1/post
router.post("/", [authJwt.verifyToken, upload.single('file')], postController.createPost);

//http://localhost:5000/api/v1/get
router.get("/", postController.getPosts);

// GET http://localhost:5000/api/v1/post/1
router.get("/:id", postController.getById);

// GET http://localhost:5000/api/v1/author/1
router.get("/author/:id", postController.getByAuthorId);

// GET http://localhost:5000/api/v1/post/1
router.put("/:id", [authJwt.verifyToken, upload.single('file')], postController.upDatePost);

// GET http://localhost:5000/api/v1/post/1
router.delete("/:id", [authJwt.verifyToken], postController.deletePost);


module.exports = router;
