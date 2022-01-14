const express = require('express');

var router = express.Router();

router.use(express.json());

const connection = require('../connection');

router
  .route('/')
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
  })
  .get(async (req, res) => {
    try {
      let p = await connection.getAll();
      res.statusCode = 200;
      res.send(p);
    } catch (error) {
      res.statusCode = 400;
      res.send(error);
    }
  });

router.route('/langs').get(async (req, res, next) => {
  try {
    var langs = req.query.langs.split('_');
    let data = await connection.getSelectedLanguages(langs[0], langs[1]);
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

router.route('/srch').get(async (req, res, next) => {
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

router.route('/randnotag').get(async (req, res, next) => {
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

router.route('/randwtag').get(async (req, res, next) => {
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

router.route('/tag').get(async (req, res, next) => {
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

router.route('/tags').get(async (req, res, next) => {
  try {
    let data = await connection.getAllDifferentTags();
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 400;
    res.send(error);
  }
});

router.route('/langtag').get(async (req, res, next) => {
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

router.route('/cols').get(async (req, res, next) => {
  try {
    let data = await connection.getDatabaseColumns();
    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

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

router.route('/mod').patch(async (req, res, next) => {
  try {
    await connection.modifyOneValue(req.body);
    res.statusCode = 200;
    res.send(req.body);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

router.route('/modall').patch(async (req, res, next) => {
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
