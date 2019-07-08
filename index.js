const express = require('express'); // Common JS Modules. Not ES2015 obv.

const db = require('./data/hubs-model');

const server = express();

const port = 5000;

server.get('/', (req, res) => {
  res.send('Hello Node / route');
});

server.get('/hubs', (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(port, () => {
  console.log(`hi from ${port}`);
});
