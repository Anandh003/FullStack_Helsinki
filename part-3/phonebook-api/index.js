require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const phoneBook = require("./models/phonebook");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = process.env.PORT;

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

// const requestLogger = (req, res, next) => {
//   console.log("Method:", req.method);
//   console.log("Path:", req.path);
//   console.log("Body:", req.body);
//   console.log("---");
//   next();
// };

const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :req-body",
  {
    skip: (req, res) => req.method !== "POST",
  }
);

morgan.token("req-body", (req, res) => JSON.stringify(req.body));

app.use(requestLogger);

const getUniqueId = () => {
  const max =
    entries.length > 0 ? Math.max(...entries.map((entry) => entry.id)) : 0;
  return max + 1;
};

app.get("/api/persons", (request, response) => {
  phoneBook.find({}).then((entries) => response.json(entries));
});

app.get("/api/persons/:id", (request, response, next) => {
  phoneBook
    .findById(request.params.id)
    .then((entry) => {
      if (entry) response.json(entry);
      else response.status(404).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new phoneBook({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((result) => response.json(person))
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (request, response, next) => {
  phoneBook
    .findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  if (!id) return response.status(400).json({ error: "Resource Id Missing" });

  phoneBook
    .findOneAndUpdate(
      { _id: id },
      { ...request.body },
      { new: true, runValidators: true, context: "query" }
    )
    .then((result) => {
      if (result) {
        response.status(200).json(result);
        return;
      }
      response.status(500).json({ error: "Invalid return" });
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  phoneBook
    .find({})
    .then((entries) =>
      response.send(
        `Phone book has info for ${entries.length} people<br><br>${new Date()}`
      )
    );
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(404).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(404).send({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

app.use(unknownEndpoint);

app.listen(PORT, () =>
  console.log(`Running Server on http://localhost:${PORT}`)
);
