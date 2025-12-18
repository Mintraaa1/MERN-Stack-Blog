const PostModel = require("../models/Post");

exports.createPost = async (req, res) => {
    const { title,sumary, content, cover } = req.body;
    const authorId = req.authorId;
    if(!title || !sumary || !content || !cover){
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
        author: authorId,
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

exports.upDatePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.authorId;
    if(!id){
        return res.status(400).send({
            message: "ID is missing"
        })
    }
    const { title,sumary, content, cover } = req.body;
    if(!title || !sumary || !content || !cover){
      return res.status(400).send({
        message: "Please provide all fields",
      });
    } try {
    const postDoc = await PostModel.findOne({_id:id, author:author });
    if(!postDoc){
      return res.status(404).send({message:"Post with this author id is not found" });
    }
    if(postDoc.length<0){
      return res.status(403).send({ message: "Unauthorize to edit this post, because you are not the author of this post", 
      });
    } else {
    //postDoc.title = title;
    //postDoc.sumary = sumary;
    //postDoc.content = content;
    //postDoc.cover = cover;
    //await postDoc.save();
    const newPost = await PostModel.findOneAndUpdate(
    {author: authorId,_id: id },
    {title, sumary,content,cover },
    {
    new:true,
    }
    );
    if (!newPost) {
      return res.status(500).send({message: "Cannot Update this post" });
    }
    res.send({message:"Post updated successfully "})
    }
    } catch (error) {
        res.status(500).send({
        message: error.message || "Some errors occurred while registering a new user",
    });
    }
    
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.authorId;

  if(!id){
        return res.status(400).send({
            message: "Post ID is missing"
        });
    }
    try {
    const postDoc = await PostModel.findOneAndDelete({
      author: authorId, 
      _id: id 
     });
    if(!postDoc){
      return res.status(500).send({message: "Cannot delete this post" });
    }
    res.send({message: "Post delete successfully" });
  }catch (error) {
        res.status(500).send({
        message: error.message || "Some errors occurred while registering a new user",
    });
}
}