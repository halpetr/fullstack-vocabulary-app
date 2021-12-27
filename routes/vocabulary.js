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

router.route('/word').get(async (req, res, next) => {
  try {
    var word = req.query.word;
    let data = await connection.find(word);
    if (data.length !== 0) {
      res.statusCode = 200;
      res.send(data);
      next();
    } else {
      res.statusCode = 404;
      res.send({ message: `There is no word like ${word}` });
    }
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

module.exports = router;
