const bcrypt = require('bcrypt');
const User = require('../models/user');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ passwordHash, userName: 'root' });

    await user.save();
  });

  test('creation suceeds with fresh username', async () => {
    const userAtStart = await helper.usersInDb();


    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('content-type', /applicaton\/json/);

    const userAtEnd = await helper.usersInDb();

    expect(userAtEnd).toHaveLength(userAtStart.length + 1);

    const userNames = userAtEnd.map(user => user.userName);
    expect(userNames).toContain(newUser.userName);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const userAtStart = await helper.userInDb();

    const newUser = {
      userName: 'root',
      password: 'salainen',
      name: 'superuser'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /applicaton\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');
    const userAtEnd = await helper.userInDb();
    expect(userAtEnd).toEqual(userAtStart);
  });
});