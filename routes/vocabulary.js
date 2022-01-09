const express = require('express');

var router = express.Router();

router.use(express.json());

const connection = require('../connection');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      let data = await connection.getAll();
      res.send(data);
      next();
    } catch (error) {
      return console.log(error);
    }
  })
  .post(async (req, res, next) => {
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

router.route('/langs').get(async (req, res, next) => {
  try {
    var langs = req.query.langs.split('_');
    console.log(langs);
    let data = await connection.getSelectedLanguages(langs[0], langs[1]);
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 400;
    return console.log(error);
  }
});

router.route('/tag').get(async (req, res, next) => {
  try {
    var tag = req.query.tag;
    let data = await connection.findByTag(tag);
    if (data.length !== 0) {
      res.statusCode = 200;
      res.send(data);
      next();
    } else {
      res.statusCode = 404;
      res.send({ message: `There is no word like ${tag}` });
    }
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

router.route('/cols').get(async (req, res, next) => {
  try {
    let data = await connection.getDatabaseColumns();
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
