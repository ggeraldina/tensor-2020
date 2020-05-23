const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// API
server.get('/example/', (req, res) => {
  const SUCCESS = require('./data/EXAMPLE.json');
  res.jsonp(SUCCESS);
});

server.use(router);
server.listen(1234, () => {
  console.info('JSON Server is running on port 1234');
});
