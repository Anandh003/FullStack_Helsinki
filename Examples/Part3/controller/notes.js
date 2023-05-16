const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
  const authorization = request.get('Authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }

  return null;
};

notesRouter.get('/', (request, response) => {
  Note.find({})
    .populate('user', { userName: 1, name: 1 })
    .then((notes) => {
      response.json(notes);
    });
});

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) response.json(note);
    else response.status(404).end();

  }
  catch (exception) {
    next(exception);
  }
});

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).send({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  try {
    const note = new Note({
      content: body.content,
      important: body.important || false,
      user: user.id,
    });
    const savedNote = await note.save();
    user.notes = user.notes.concat(note.id);
    user.save();
    response.status(201).json(savedNote);
  } catch (e) {
    next(e);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
  catch (exception) {
    next(exception);
  }
});

notesRouter.put('/:id', (request, reponse, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      reponse.json(updatedNote);
    })
    .catch((err) => next(err));
});

module.exports = notesRouter;
