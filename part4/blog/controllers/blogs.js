const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) res.json(blog);
    else res.status(404).end();

    // Blog.findById(req.params.id)
    //     .then((b) => {
    //         if (b) res.json(b);
    //         else res.status(404).end();
    //     })
    //     .catch((err) => next(err));
});

blogsRouter.post("/", async (req, res, next) => {
    const body = req.body;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
    // blog.save()
    //     .then((result) => {
    //         res.status(201).json(result);
    //     })
    //     .catch((err) => next(err));
});

blogsRouter.delete("/:id", async (req, res, next) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = blogsRouter;
