const mysql = require('mysql');
require('dotenv').config();

/**
 * Connection config
 */
var config = {
  connectionLimit: 10,
  host: 'mydb.tamk.fi',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
};

/**
 * Create connectionpool based on config
 */
var pool = mysql.createPool(config);

/**
 * Functions used for to get data from database
 */
let connectionFunctions = {
  /**
   * This function is used to access all entries in the Vocabulary table of the database.
   * @returns {Promise}
   */
  getAll: () =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `select * from Vocabulary;`;
        connection.query(sql, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
          connection.release();
        });
      });
    }),

  /**
   * Description
   * @param {any} sourceLang
   * @param {any} targetLang
   * @returns {any}
   */
  getSelectedLanguages: (sourceLang, targetLang) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `SELECT id, ${sourceLang}, ${targetLang} FROM Vocabulary ORDER BY RAND() LIMIT 10;`;
        connection.query(sql, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        });
        connection.release();
        if (err) throw err;
      });
    }),

  /**
   * This function is used to post an entry in the Vocabulary database.
   * @param {Object} body - The request body
   * @returns {Promise}
   */
  post: (body) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `INSERT INTO Vocabulary (tags, English, Finnish, Swedish, Russian) values (${connection.escape(
          body.tags
        )},${connection.escape(body.English)}, ${connection.escape(
          body.Finnish
        )}, ${connection.escape(body.Swedish)}, ${connection.escape(
          body.Russian
        )});`;
        connection.query(sql, (error) => {
          if (error) {
            reject(error);
          }
          resolve(body);
        });
        connection.release();
        if (err) throw err;
      });
    }),

  /**
   * Description
   * @param {string} tag - The tag that is searched for in the database.
   * @returns {Promise}
   */
  findByTag: (tag) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `select * from Vocabulary where
                      tags REGEXP '^.*${tag}.*$';`;
        connection.query(sql, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
          connection.release();
          if (err) throw err;
        });
      });
    }),

  getBySearch: async (lang, srch) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `SELECT id, ${lang} FROM Vocabulary WHERE ${lang} REGEXP '^.*${srch}.*$';`;
        console.log(sql);
        connection.query(sql, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
          connection.release();
          if (err) throw err;
        });
      });
    }),

  getRandomWords: (lang) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `SELECT ${lang} FROM Vocabulary ORDER BY RAND() LIMIT 10;`;
        connection.query(sql, (error, res) => {
          if (error) {
            reject(error);
          }
          resolve(res);
          connection.release();
        });
      });
    }),

  getRandomWordsBasedOnTag: (lang, tag) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(tag);
        var sql = `SELECT ${lang} FROM Vocabulary WHERE tags = ${connection.escape(
          tag
        )} ORDER BY RAND() LIMIT 10;`;
        connection.query(sql, (error, resu) => {
          if (error) {
            reject(error);
          }
          resolve(resu);
          connection.release();
        });
      });
    }),

  getByLangTag: async (langtag) =>
    new Promise((resolve, reject) => {
      let data = langtag.split('_');
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `SELECT tags, ${data[0]} FROM Vocabulary WHERE
                      tags = ${connection.escape(data[1])};`;
        connection.query(sql, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
          connection.release();
          if (err) throw err;
        });
      });
    }),

  getAllDifferentTags: () =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = 'SELECT DISTINCT tags from Vocabulary;';
        connection.query(sql, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
          connection.release();
          if (err) throw err;
        });
      });
    }),

  getDatabaseColumns: () =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
          "select column_name from information_schema.columns where table_name='Vocabulary';",
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
            connection.release();
            if (err) throw err;
          }
        );
      });
    }),

  deleteById: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `DELETE FROM Vocabulary WHERE id = ${connection.escape(id)};`;
        connection.query(sql, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve({ msg: 'Deleted successfully!' });
          connection.release();
          if (err) throw err;
        });
      });
    }),

  modifyEntry: (body) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `UPDATE Vocabulary SET ${body.column} = ${connection.escape(
          body.value
        )} WHERE id = ${connection.escape(body.id)};`;
        connection.query(sql, (error, result) => {
          if (error) reject(error);
          resolve({ msg: 'Modified successfully!' });
          connection.release();
          if (err) throw err;
        });
      });
    }),
};

module.exports = connectionFunctions;
