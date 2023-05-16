const Blog = require("../models/blog");
const helper = require("./blog_helper");
const app = require("../app");
const superTest = require("supertest");
const { default: mongoose } = require("mongoose");
const api = superTest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const promiseArray = helper.initialBlogs.map(blog => new Blog(blog).save());

  await Promise.all(promiseArray);
});

test("all notes are returned", async () => {
  const blogs = await api.get("/api/blogs");

  expect(blogs.body).toHaveLength(helper.initialBlogs.length);
});

test("has id property", async () => {
  const blogs = await api.get("/api/blogs");

  expect(blogs.body).toBeDefined();
});

test("post blog", async () => {
  const newBlog = {
    title: "new Title",
    author: "shakespear",
    url: "newTitle.com",
    likes: 0,
  };

  const response = await api.post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const newBlogId = response.body.id;

  const blogs = await helper.blogsInDb();

  expect(blogs).toHaveLength(helper.initialBlogs.length + 1);

  const blog = await api.get(`/api/blogs/${newBlogId}`);

  expect(blog.body).toMatchObject(newBlog);
});

test("Missing likes", async () => {
  const newBlog = {
    title: "new Title",
    author: "shakespear",
    url: "newTitle.com",
  };

  const response = await api.post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const newBlogId = response.body.id;

  const blog = await api.get(`/api/blogs/${newBlogId}`);
  expect(blog.body).toHaveProperty("likes", 0);
});

test("Check Mandatory Fields", async () => {
  const newBlog = {
    author: "Shakespear",
    likes: 2,
  };

  await api.post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("delete single blog post", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToBeDeleted = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(200);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

});

test("Update blog post", async () => {
  const blogsAtStart = await helper.blogsInDb();

  let blogsToBeUpdate = blogsAtStart[0];

  blogsToBeUpdate = { ...blogsToBeUpdate, title: "helloWorld" };

  const response = await api
    .put(`/api/blogs/${blogsToBeUpdate.id}`)
    .send(blogsToBeUpdate)
    .expect(201);

  expect(response.body).toEqual(blogsToBeUpdate);
});


afterAll(async () => await mongoose.connection.close());