const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const notesRouter = require("./controller/notes");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to ", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err.message));

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
