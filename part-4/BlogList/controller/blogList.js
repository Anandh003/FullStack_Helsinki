const blogListRouter = require('express').Router();
const Blog = require('../models/blog');

blogListRouter.get('/', (request, response, next) => {
  try {
    Blog.find({}).then((blogs) => {
      response.json(blogs);
    });
  } catch (Exception) {
    next(Exception);
  }
});

blogListRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();
    response.status(201).json(result);
  }
  catch (Exception) {
    next(Exception);
  }
});

blogListRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    response.status(200).json(blog);
  }
  catch (exception) {
    next(exception);
  }
});

blogListRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(200).end();
  } catch (Exception) {
    next(Exception);
  }
});

blogListRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = request.body;
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    response.status(201).json(newBlog);
  }
  catch (Exception) {
    next(Exception);
  }
});

module.exports = blogListRouter;
