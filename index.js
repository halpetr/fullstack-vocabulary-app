const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const port = process.env.PORT || 8080;

const vocabulary = require('./routes/vocabulary');

const users = require('./routes/users');

/**
 * Middleware
 */
app.use(express.json());
app.use(cors());
app.use('/vocabulary', vocabulary);
app.use('/users', users);
app.use(express.static('frontend/build'));

/**
 * Create a server (app.listen)
 */
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

/**
 * Create a shutdown sequence
 */
const shutdown = () => {
  console.log('Signal to close received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
};
// If terminated:
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

app.get('/*', function (req, res) {
  res.sendFile(
    path.join(__dirname, 'frontend/build/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
