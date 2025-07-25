const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { error } = require("../utils/logger");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

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

blogsRouter.post("/", userExtractor, async (req, res, next) => {
    const body = req.body;
    const user = req.user;
    
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

blogsRouter.delete("/:id", userExtractor, async (req, res, next) => {
    const user = req.user;
    const blog = await Blog.findById(req.params.id);
    if (!blog || user.id !== blog.user.toString()) {
        return res.status(404).json({ error: "blog id dont exist" });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

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
