const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
    {
        title: "Test1 Blog",
        author: "xw",
        url: "test.com",
    },
    {
        title: "Test2 Blog",
        author: "xw2",
        url: "test.com",
        likes: 100,
    },
];

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
});

describe("BACKEND TESTS", () => {
    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test.only("all notes are returned", async () => {
        const response = await api.get("/api/blogs");
        assert.strictEqual(response.body.length, initialBlogs.length);
    });

    test("a specific note is within the returned notes", async () => {
        const response = await api.get("/api/blogs");

        const titles = response.body.map((e) => e.title);
        assert(titles.includes("Test1 Blog")); //error if its false
    });

    test("a valid blog can be added ", async () => {
        const newBlog = {
            title: "async/await simplifies making async calls",
            author: "xw3",
            url: "test.com",
            likes: 101,
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const response = await api.get("/api/blogs");
        const titles = response.body.map((r) => r.title);
        assert.strictEqual(response.body.length, initialBlogs.length + 1);
        assert(titles.includes("async/await simplifies making async calls"));
    });

    test("blogs without required are not added", async () => {
        const newBlog = {
            important: true,
        };

        await api.post("/api/blogs").send(newBlog).expect(400);

        const response = await api.get("/api/blogs");

        assert.strictEqual(response.body.length, initialBlogs.length);
    });
});

after(async () => {
    await mongoose.connection.close();
});
