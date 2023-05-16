const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, important: 1 });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { userName, password, name } = request.body;
  if (
    password.length < 8 ||
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
  ) {
    return response.status(400).json(
      {
        error: 'ValidationError',
        message: 'Password is not strong enough'
      }
    );
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const user = new User({ userName, name, passwordHash });
    const savedUser = await user.save();
    response.status(204).json(savedUser);
  } catch (e) {
    console.log(e);
    response.status(400).json({ error: e.name, message: e.message });
  }

});

module.exports = usersRouter;