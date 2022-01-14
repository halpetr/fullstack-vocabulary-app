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
      console.log(data);
    });
  } catch (error) {
    return console.log(error);
  }
});

router.route('/login').get(async (req, res, next) => {
  try {
    var id = req.body.user_id;
    console.log(id);
    let data = await connection.getUser(id);
    return bcrypt.compare(
      req.body.pw,
      data[0].password,
      function (err, result) {
        if (result) {
          return console.log(true);
        }
        if (err) throw err;
      }
    );
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
