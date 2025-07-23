const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs);
});

blogsRouter.get("/:id", (req, res, next) => {
    Blog.findById(req.params.id)
        .then((b) => {
            if (b) res.json(b);
            else res.status(404).end();
        })
        .catch((err) => next(err));
});

blogsRouter.post("/", (req, res, next) => {
    const body = req.body;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    });

    blog.save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => next(err));
});

blogsRouter.delete("/:id", (req, res, next) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).end())
        .catch((err) => next(err));
});

module.exports = blogsRouter;
