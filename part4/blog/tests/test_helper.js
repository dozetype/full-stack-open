const Blog = require('../models/blog')

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

const nonExistingId = async () => {
  const blog = new Blog({ title: "Lack required" })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
