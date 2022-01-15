/**
 * Express router providing users related routes
 * @module routers/users
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * bcrypt module
 * @const
 */
const bcrypt = require('bcrypt');

/**
 * Numer of hashes with salt used by bcrypt
 * @const
 */
const saltRounds = 10;

/**
 * Require module from the file that has the connection data and functions
 * @param {string} path - Path to file
 * @const
 */
const connection = require('../connection');

/**
 * Express router for user related functions.
 * @type {object}
 * @var
 * @namespace usersRouter
 */
var router = express.Router();

/**
 * Router given middleware
 */
router.use(express.json());

/**
 * Route for creating a user
 * @name post/createUser
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.post('/register', async (req, res, next) => {
  try {
    var body = req.body;
    bcrypt.hash(body.pw, saltRounds, async (err, hash) => {
      let data = await connection.registerUser(body.user, hash);
      res.statusCode = 200;
      res.send(data);
    });
  } catch (error) {
    res.statusCode = 400;
    res.send(error);
  }
});

/**
 * Route for creating a user
 * @name get/login
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.get('/login', async (req, res, next) => {
  try {
    var loginInfo = req.query.login.split('_');
    let data = await connection.getUser(loginInfo[0]);
    if (data.length !== 0) {
      const match = await bcrypt.compare(loginInfo[1], data[0].password);
      res.statusCode = 200;
      res.send(match);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
