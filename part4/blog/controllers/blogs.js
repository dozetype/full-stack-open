const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { error } = require("../utils/logger");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) res.json(blog);
    else res.status(404).end();
});

blogsRouter.post("/", async (req, res, next) => {
    const body = req.body;
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({
            error: "token invalid",
        });
    }
    const user = await User.findById(decodedToken.id);

    if (!user) {
        return res.status(400).json({ error: "userID missing or not valid" });
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
});
blogsRouter.delete("/:id", async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({
            error: "token invalid",
        });
    }
    const user = await User.findById(decodedToken.id);
    if (!user) {
        return res.status(400).json({ error: "userID missing or not valid" });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog || decodedToken.id !== blog.user.toString()) {
        return res.status(404).json({ error: "blog id dont exist" });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
});
// blogsRouter.delete("/:id", async (req, res, next) => {
//     await Blog.findByIdAndDelete(req.params.id);
//     res.status(204).end();
// });

blogsRouter.put("/:id", async (req, res, next) => {
    const { likes } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        blog.likes = likes;
        const savedBlog = await blog.save();
        res.status(200).json(savedBlog);
    } else res.status(404).end();
});

module.exports = blogsRouter;
