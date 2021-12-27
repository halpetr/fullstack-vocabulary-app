const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 8080;

const vocabulary = require('./routes/vocabulary');

/**
 * Middleware
 */
app.use(express.json());
app.use(cors());
app.use('/vocabulary', vocabulary);

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

// For testing connection
app.get('/', async (req, res, next) => {
  res.send({ message: 'ok' });
});
