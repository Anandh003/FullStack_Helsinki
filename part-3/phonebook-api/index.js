const { json } = require("express");
const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3001;

app.use(express.json());

let entries = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const getUniqueId = () => {
  const max =
    entries.length > 0 ? Math.max(...entries.map((entry) => entry.id)) : 0;
  return max + 1;
};

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
};

morgan.token("req-body", (req, res) => JSON.stringify(req.body));

// app.use(requestLogger);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body",
    {
      skip: (req, res) => req.method !== "POST",
    }
  )
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/api/persons", (request, response) => {
  response.json(entries);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = entries.find((entry) => entry.id === id);

  if (person) response.json(person);
  else response.status(404).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.content)
    return response.status(400).json({ error: "Content Missing" });

  if (!body.name)
    return response.status(400).json({ error: "name is missing" });

  if (!body.number)
    return response.status(400).json({ error: "number is missing" });

  const entry = entries.find((entry) => entry.name === body.name);

  if (entry) return response.status(400).json({ error: "name must be unique" });

  const person = {
    id: Math.floor(Math.random() * 10000),
    content: body.content,
    name: body.name,
    number: body.number,
  };

  entries = entries.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  entries = entries.filter((entry) => entry.id !== id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  response.send(
    `Phone book has info for ${entries.length} people<br><br>${new Date()}`
  );
});

app.use(unknownEndpoint);
app.listen(PORT, () =>
  console.log(`Running Server on http://localhost:${PORT}`)
);
