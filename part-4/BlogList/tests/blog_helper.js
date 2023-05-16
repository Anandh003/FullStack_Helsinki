const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "No Title",
    author: "Sharma",
    url: "www.notitle.com",
    likes: 2,
  },
  {
    title: "Money",
    author: "Unknown",
    url: "unknown.com",
    likes: 0
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  blogsInDb, initialBlogs
};
