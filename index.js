const express = require('express');

const server = express();

const port = 5000;

server.get('/', (req, res) => {
  res.send('Hello Node / route');
});

server.listen(port, () => {
  console.log(`hi from ${port}`);
});
