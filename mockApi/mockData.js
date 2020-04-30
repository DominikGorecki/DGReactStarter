const users = [
  {
    id: 1,
    username: 'jsmith',
    password: '1234',
    createdAt: 1569268837119
  },
  {
    id: 2,
    username: 'jdoe',
    password: '4567',
    createdAt: 1569268837600
  }
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  users
};