const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/note');


beforeEach(async () => {
  await Note.deleteMany({});

  const promiseArray = helper.initialNotes.map(note => new Note(note).save());

  await Promise.all(promiseArray);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(helper.initialNotes.length);
});


test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes');

  const contents = response.body.map(r => r.content);
  expect(contents).toContain('Browser can execute only JavaScript');
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 10000);

test('there are two notes', async () => {
  const response = await api.get('/api/notes');
  expect(response.body).toHaveLength(2);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes');

  expect(response.body[0].content).toBe('HTML is easy');
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async call',
    important: true
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/notes');
  const content = response.body.map(r => r.content);
  expect(content).toHaveLength(helper.initialNotes.length + 1);
});

test('note without content is not added', async () => {
  const newNote = { important: true };

  await api.post('/api/notes').send(newNote).expect(400);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb();

  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultNote.body).toEqual(noteToView);
});

test('notes can be deleted', async () => {
  const notesAtStart = await helper.notesInDb();

  const noteToBeDeleted = notesAtStart[0];

  await api
    .delete(`/api/notes/${noteToBeDeleted.id}`)
    .expect(204);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

  const contents = notesAtEnd.map(note => note.content);

  expect(contents).not.toContain(noteToBeDeleted.content);
});

afterAll(async () => await mongoose.connection.close());
