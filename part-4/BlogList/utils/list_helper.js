const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, item) => acc + item.likes;

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const getMinimalBlogInfo = ({ likes, author, title }) => {
  return {
    likes,
    author,
    title,
  };
};

const favoriteBlog = (blogs) => {
  const reducer = (acc, item) => {
    return "likes" in acc
      ? item.likes > acc.likes
        ? getMinimalBlogInfo(item)
        : acc
      : getMinimalBlogInfo(item);
  };

  return blogs.reduce(reducer, {});
};

const groupBlogsByAuthor = (blogs) => {
  return _.reduce(
    blogs,
    (result, blog) => {
      (result[blog.author] || (result[blog.author] = [])).push(blog);
      return result;
    },
    {}
  );
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return {};

  const blogsByAuthor = groupBlogsByAuthor(blogs);

  const mostBlogs = Object.entries(blogsByAuthor).reduce((acc, item) => {
    if (!("blogs" in acc)) {
      return { author: item[0], blogs: item[1].length };
    }

    if (acc.blogs < item[1].length)
      return { author: item[0], blogs: item[1].length };

    return acc;
  }, {});

  return mostBlogs;
};

const mostLikes = (blogs) => {
  if (!blogs.length) return {};

  const blogsByAuthor = groupBlogsByAuthor(blogs);

  const sumOfLikesReducer = (acc, blog) => acc + blog.likes;

  return Object.entries(blogsByAuthor).reduce((acc, item) => {
    const totalLikes = item[1].reduce(sumOfLikesReducer, 0);

    if (!("likes" in acc)) return { author: item[0], likes: totalLikes };

    if (acc.likes < totalLikes) return { author: item[0], likes: totalLikes };

    return acc;
  }, {});
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
