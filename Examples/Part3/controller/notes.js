const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

notesRouter.get("/:id", (request, response) => {
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

notesRouter.post("/", (request, response, next) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note
    .save()
    .then((savedNote) => response.json(savedNote))
    .catch((err) => {
      next(err);
    });
});

notesRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((err) => next(err));
});

notesRouter.put("/:id", (request, reponse, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      reponse.json(updatedNote);
    })
    .catch((err) => next(err));
});

module.exports = notesRouter;
