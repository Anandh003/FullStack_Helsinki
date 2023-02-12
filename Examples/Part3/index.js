require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Note = require("./models/note");
const { response } = require("express");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

const PORT = process.env.PORT;

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxId + 1;
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) response.json(note);
      else response.status(404).end();
    })
    .catch((err) => {
      console.log(err);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.post("/api/notes", (request, response) => {
  if (!request.body.content) {
    return response.status(400).json({ error: "contetnt missing" });
  }
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note.save().then((savedNote) => response.json(savedNote));
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((err) => next(err));
});

app.put("/api/notes/:id", (request, reponse, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      debugger;
      reponse.json(updatedNote);
    })
    .catch((err) => next(err));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
