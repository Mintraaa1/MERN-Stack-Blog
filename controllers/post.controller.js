const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  try {
    const { title, content, cover } = req.body;

    const post = await Post.create({
      title,
      content,
      cover,
      author: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Cannot create post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Cannot get posts" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Cannot get post" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ error: "Post not found" });

    // อนุญาตเฉพาะเจ้าของโพสต์
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.cover = req.body.cover || post.cover;

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Cannot update post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ error: "Post not found" });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Cannot delete post" });
  }
};
