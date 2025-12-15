const PostModel = require("../models/Post");

exports.createPost = async (req, res) => {
    const { title,sumary, content, cover,author } = req.body;
    if(!title || !sumary || !content || !cover || !author){
      return res.status(400).send({
        message: "Please provide all fields",
      });
    }
    try {
      const postDoc = await PostModel.create({
        title,
        sumary,
        content,
        cover,
        author,
      });
      if(!postDoc){
        return res.status(500).send({
          message:"Cannot create a new post"
      });
      }
      res.send({message: "Create a new post successfully", data: postDoc});
    } catch (error) {
      res.send(500).send({
          message: error.message || "Cannot create a new post",
  });
    }
}
  
exports.getPosts = async (req,res) => {
  try{
    const posts = await PostModel.find().populate("author", ["username"]).sort
    ({createPost: -1}).limit(20);
    if(!posts){
      return res.status(404).send({
        message: "POST not found",
      });
    }
    res.json(posts);
  } catch(error) {
    res.status(500).send({
          message: error.message || "Some eror",
  });
  }
}

exports.getById = async (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).send({
            message: "ID is missing"
        })
    }
    try{
        const post = await PostModel.findById(id)
        .populate("author", ["username"])
        .sort({ createAT: -1})
        .limit(20);
        if(!post){
            return res.status(404).send({
                message: "POST not found",
            });
        }
        res.json(post);
    } catch (error) {
        res.status(500).send({
        message: error.message || "Some errors occurred while registering a new user",
    });
    }
}

exports.getByAuthorId = async (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).send({
            message: "ID is missing"
        })
    }
    try{
        const posts = await PostModel.find({ author: id})
        .populate("author", ["username"])
        .sort({ createAT: -1})
        .limit(20);
        if(!posts){
            return res.status(404).send({
                message: "POST not found",
            });
        }
        res.json(posts);
    } catch (error) {
        res.status(500).send({
        message: error.message || "Some errors occurred while registering a new user",
    });
    }
}