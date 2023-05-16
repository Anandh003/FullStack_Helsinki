const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (request, response) => {
  const { userName, password } = request.body;

  const user = await User.findOne({ userName });

  const passwordCorrect = (user === null) ?
    false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response
      .status(401)
      .json({ error: 'Invalid username or password' });
  }

  const userForToken = {
    userName: user.userName,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

  response
    .status(200)
    .send({ token, username: userName, name: user.name });
});


module.exports = loginRouter;