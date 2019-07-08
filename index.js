const express = require('express'); // Common JS Modules. Not ES2015 obv.

const db = require('./data/hubs-model');

const server = express();

server.use(express.json()); // <-- parses JSON in POSTs

const port = 5000;

server.get('/', (req, res) => {
  res.send('Hello Node / route');
});

// The C in CRUD
server.post('/hubs', (req, res) => {
  const hubInfo = req.body;
  console.log(hubInfo);

  db.add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The R in CRUD
server.get('/hubs', (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The U in CRUD
server.put('/hubs/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The D in CRUD
server.delete('/hubs/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.listen(port, () => {
  console.log(`\n*** server running on ${port} ***\n`);
});
