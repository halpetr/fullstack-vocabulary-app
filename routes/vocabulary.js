/**
 * Express router providing vocabulary related routes
 * @module routers/vocabulary
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * Express router for vocabulary related functions.
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
 * Require module from the file that has the connection data and functions
 * @param {string} path - Path to file
 * @const
 */
const connection = require('../connection');

/**
 * Route serving selected languages
 * @name get/wordsOfLanguages
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.get('/langs', async (req, res, next) => {
  try {
    var langs = req.query.langs.split('_');
    let data = await connection.getWordsOfSelectedLangs(langs[0], langs[1]);
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

/**
 * Route serving searched items
 * @name get/search
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.get('/srch', async (req, res, next) => {
  try {
    var x = req.query.srch.split('_');
    let data = await connection.getBySearch(x[0], x[1]);
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

/**
 * Route serving 10 random words
 * @name get/randomWords
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.get('/randnotag', async (req, res, next) => {
  try {
    var lang = req.query.randnotag;
    let data = await connection.getRandomWords(lang);
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 400;
    res.send(error);
  }
});

/**
 * Route serving 10 random words that share the same tag and language
 * @name get/randomWordsTagLang
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.get('/randwtag', async (req, res, next) => {
  try {
    var randwtag = req.query.randwtag.split('_');
    let data = await connection.getRandomWordsBasedOnTag(
      randwtag[0],
      randwtag[1]
    );
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 400;
    res.send(error);
  }
});

/**
 * Route serving 10 random words of any language
 * @name get/randomWordsTag
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.get('/tag', async (req, res, next) => {
  try {
    var tag = req.query.tag;
    let data = await connection.getByTag(tag);
    if (data.length !== 0) {
      res.statusCode = 200;
      res.send(data);
    } else {
      res.statusCode = 404;
      res.send({ message: `There is no word like ${tag}` });
    }
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

/**
 * Route serving all distinct tags
 * @name get/allTags
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.get('/tags', async (req, res, next) => {
  try {
    let data = await connection.getAllDifferentTags();
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 400;
    res.send(error);
  }
});

/**
 * Route serving all entries of 2 languages that have same tag
 * @name get/allTagsofSameLang
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.get('/langtag', async (req, res, next) => {
  try {
    var langtag = req.query.langtag;
    let data = await connection.getByLangTag(langtag);
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 400;
    res.send(error);
  }
});

/**
 * Route serving all database column names
 * @name get/allColumnNames
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.get('/cols', async (req, res, next) => {
  try {
    let data = await connection.getDatabaseColumns();
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

/**
 * Route serving and deleting data by Id
 * @name get/delete
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {function} route - Express router function
 * @param {callback} middleware - Async express middleware
 */
router
  .route('/id')
  .get(async (req, res, next) => {
    let id = parseInt(req.query.id);
    try {
      if (!isNaN(id)) {
        let data = await connection.getById(id);
        if (data.length === 0) {
          res.statusCode = 404;
          res.send({ msg: `No entries with ID: ${id}!` });
        } else {
          res.statusCode = 200;
          res.send(data);
        }
      } else {
        res.statusCode = 400;
        res.send({ msg: 'id not a number' });
      }
    } catch (error) {
      res.statusCode = 400;
      res.send(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      let id = parseInt(req.query.id);
      if (!isNaN(id)) {
        let data = await connection.deleteById(id);
        if (data.affectedRows === 0) {
          res.statusCode = 404;
          res.send({ msg: `No entries with ID: ${id}!` });
        } else {
          res.statusCode = 200;
          res.send({ msg: 'Deleted!' });
        }
      } else {
        res.statusCode = 400;
        res.send({ msg: 'id not a number' });
      }
    } catch (error) {
      res.statusCode = 404;
      res.send(error);
    }
  });

/**
 * Route for posting data entry into database
 * @name post
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.post('/', async (req, res, next) => {
  try {
    let body = req.body;
    let p = await connection.post(body);
    res.statusCode = 201;
    res.send(p);
  } catch (error) {
    res.statusCode = 400;
    res.send(error);
  }
});

/**
 * Route modifying one value of one entry
 * @name patch/modOneValue
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.patch('/mod', async (req, res, next) => {
  try {
    await connection.modifyOneValue(req.body);
    res.statusCode = 200;
    res.send(req.body);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

/**
 * Route modifying all values of one entry
 * @name patch/modAllValues
 * @function
 * @memberof module:routers/users~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Async express middleware
 */
router.patch('/modall', async (req, res, next) => {
  try {
    await connection.modifyAllValues(req.body);
    res.statusCode = 200;
    res.send(req.body);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

module.exports = router;
