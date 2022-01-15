/**
 * Backend start file
 * @module index
 * @requires express
 * @requires cors
 * @requires path
 */

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * cors module
 * @const
 */
const cors = require('cors');

/**
 * path module
 * @const
 */
const path = require('path');

/**
 * Instance of express middleware
 * @const
 */
const app = express();

/**
 * Port used to access database
 * @const
 */
const port = process.env.PORT || 8080;

/**
 * vocabulary route module
 * @const
 * @param {string} path - Path to module file
 */
const vocabulary = require('./routes/vocabulary');

/**
 * users route module
 * @const
 * @param {string} path - Path to module file
 */
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

/**
 * Function for handling page refreshing on admin page
 */
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
