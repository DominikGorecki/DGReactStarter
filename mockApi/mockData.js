const users = [
  {
    id: 1,
    username: 'jsmith',
    email: 'jsmith@test.com',
    password: 'Test!@34',
    createdAt: 1569268837119
  },
  {
    id: 2,
    username: 'jdoe',
    email: 'jdoe@test.com',
    password: 'Asdf!@34',
    createdAt: 1569268837600
  },
  {
    id: 2,
    username: 'test',
    email: 'test@test.com',
    password: 'Test!@34',
    createdAt: 1569268837600
  }
];

const messages = [
  {
    id: 1,
    from: 'Jack',
    subject: 'Saying hi',
    message: 'Hey there buddy!',
  },
  {
    id: 2,
    from: 'Jane',
    subject: 'Hello World',
    message: 'Did you know why we use the term "hello world"? Apparently it\' from some old C coding book!',
  },
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  users,
  messages
};