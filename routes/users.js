const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const connection = require('../connection');

var router = express.Router();

router.use(express.json());

router.route('/register').post(async (req, res, next) => {
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

router.route('/login').get(async (req, res, next) => {
  try {
    var loginInfo = req.query.login.split('_');
    let data = await connection.getUser(loginInfo[0]);
    bcrypt.compare(loginInfo[1], data[0].password, function (err, result) {
      if (err) throw err;
      res.statusCode = 200;
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
