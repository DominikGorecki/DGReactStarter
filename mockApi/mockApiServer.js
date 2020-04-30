/* eslint-disable no-console */
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: 'node_modules/json-server/dist'
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function(req, res, next) {
  setTimeout(next, 400);
});
// Declaring custom routes below. Add custom routes before JSON Server router

// Auth
const userdb = JSON.parse(fs.readFileSync(path.join(__dirname, './users.json'), 'UTF-8'));
const SECRET_KEY = '123456789SECRETKEY';
const expiresIn = '1h';

// Create a token from a payload 
const createToken = (payload) => 
  jwt.sign(payload, SECRET_KEY, {expiresIn});

// Verify the token 
const verifyToken = (token) =>
  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err);

// Check if the user exists in database
const isAuthenticated = ({email, password}) => 
  userdb.users.findIndex(user => user.email === email && user.password === password) !== -1;

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({status, message});
    return;
  }
  const access_token = createToken({email, password});
  res.status(200).json({access_token});
});

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({status, message});
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error: access_token is not valid';
    res.status(status).json({status, message});
  }
});

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use('/api',router);
// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});