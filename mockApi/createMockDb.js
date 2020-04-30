/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const mockData = require('./mockData');

const { users } = mockData;
const userData = JSON.stringify({ users });
const userDataPath = path.join(__dirname, 'users.json');
fs.writeFile(userDataPath, userData, function(err) {
  err ? console.log(err) : console.log('User DB created.');
});

const { messages } = mockData;
const messagesData = JSON.stringify({ messages});
const messagesDataPath = path.join(__dirname, 'db.json');
fs.writeFile(messagesDataPath, messagesData, function(err) {
  err ? console.log(err) : console.log('Mock DB created.');
});