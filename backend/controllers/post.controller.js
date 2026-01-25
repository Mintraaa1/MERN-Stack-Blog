const PostModel = require("../models/Post");
const fs = require("fs");

// สร้างโพสต์
exports.createPost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path: tempPath } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = tempPath + "." + ext;
    fs.renameSync(tempPath, newPath);
  }
  const { title, summary, content } = req.body;
  try {
    const postDoc = await PostModel.create({
      title, summary, content,
      cover: newPath,
      author: req.authorId,
    });
    res.status(201).json(postDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ลบโพสต์ (สำคัญ!)
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await PostModel.findOne({ _id: id, author: req.authorId });
    if (!postDoc) return res.status(403).json({ message: "No permission or not found" });

    if (postDoc.cover && fs.existsSync(postDoc.cover)) {
      fs.unlinkSync(postDoc.cover); // ลบไฟล์จริง
    }
    await postDoc.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ... (getPosts, getById, upDatePost ใช้โค้ดเดิมที่คุณมีได้เลยครับ)