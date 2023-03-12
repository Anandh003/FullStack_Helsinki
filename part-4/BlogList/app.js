const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogListRouter = require("./controller/blogList");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to DB"))
  .catch((err) => logger.error(`Error in DB ${err.message}`));

app.use("/api/blogs", blogListRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
