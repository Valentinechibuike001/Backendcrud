import { Post } from "../models/post.model.js";

//CREATE A POST
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;
    if (!name || !description || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const post = await Post.create({ name, description, age });

    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Read all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// UPDATE POST
const updatePost = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "no data provided for update" });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post)
      return res.status(404).json({ message: "post not found" });

      res.status(200).json({message:'post updated succesfully',post})
               

      
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export { createPost, getPosts ,updatePost};
