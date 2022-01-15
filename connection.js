/**
 * Module containing database mysql access and functions
 * @module connection
 * @requires mysql
 * @requires dotenv
 */

/**
 * mysql module
 * @const
 */
const mysql = require('mysql');

/**
 * Create dotenv config to access process.env info
 */
require('dotenv').config();

/**
 * Connection config
 * @var
 */
var config = {
  connectionLimit: 10,
  host: 'mydb.tamk.fi',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
};

/**
 * mysql connectionpool based on config
 * @var
 */
var pool = mysql.createPool(config);

/**
 * Functions used for accessing data from database
 * @let
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
   * This function is used to get 10 random words of 2 different languages
   * @param {string} sourceLang
   * @param {string} targetLang
   * @returns {Promise}
   */
  getWordsOfSelectedLangs: (sourceLang, targetLang) =>
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
   * This function is used to retrieve all entries from database with the tag
   * @param {string} tag - The tag that is searched for in the database.
   * @returns {Promise}
   */
  getByTag: (tag) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `select * from Vocabulary where
                      tags REGEXP '^.*${tag}.*$' ORDER BY RAND() LIMIT 10;`;
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

  /**
   * This function is used to retrieve all entries that are like the search value
   * @param {string} lang - language that words are in
   * @param {string} srch - search value
   * @returns {Promise}
   */
  getBySearch: async (lang, srch) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `SELECT id, ${lang} FROM Vocabulary WHERE ${lang} REGEXP '^.*${srch}.*$';`;
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

  /**
   * This function is used to retrieve entry from database based on id
   * @param {int} id - entry id
   * @returns {Promise}
   */
  getById: async (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `SELECT * FROM Vocabulary WHERE id = ${connection.escape(
          id
        )};`;
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

  /**
   * This function is used to retrieve 10 random words of certain language from database
   * @param {string} lang - language selected
   * @returns {Promise}
   */
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

  /**
   * This function is used to retrieve 10 random words of certain language based on tag from database
   * @param {string} lang - language selected
   * @param {string} tag - tag selected
   * @returns {Promise}
   */
  getRandomWordsBasedOnTag: (lang, tag) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
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

  /**
   * This function is used to retrieve entries from database based on languages and tag
   * @param {Object} langtag - contains languages and tag
   * @returns {Promise}
   */
  getByLangTag: async (langtag) =>
    new Promise((resolve, reject) => {
      let data = langtag.split('_');
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `SELECT tags, ${data[0]}, ${data[1]} FROM Vocabulary WHERE
                      tags = ${connection.escape(data[2])};`;
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

  /**
   * This function is used to retrieve all distinct tags from database
   * @returns {Promise}
   */
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

  /**
   * This function is used to retrieve all column names from database
   * @returns {Promise}
   */
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

  /**
   * This function is used to post an entry in the Vocabulary database.
   * @param {Object} body - the request body containing all data
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
   * This function is used to delete entry based id
   * @param {int} id
   * @returns {Promise}
   */
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `DELETE FROM Vocabulary WHERE id = ${connection.escape(id)};`;
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

  /**
   * This function is used to modify one value of one entry in database.
   * @param {Object} body - the request body containing all data
   * @returns {Promise}
   */
  modifyOneValue: (body) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `UPDATE Vocabulary SET ${body.column} = ${connection.escape(
          body.value
        )} WHERE id = ${connection.escape(body.id)};`;
        connection.query(sql, (error, result) => {
          if (error) reject(error);
          resolve(result);
          connection.release();
          if (err) throw err;
        });
      });
    }),

  /**
   * This function is used to modify all values of one entry in database.
   * @param {Object} body - the request body containing all data
   * @returns {Promise}
   */
  modifyAllValues: (body) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `UPDATE Vocabulary SET tags = ${connection.escape(
          body.tags
        )}, English = ${connection.escape(
          body.English
        )}, Finnish = ${connection.escape(
          body.Finnish
        )}, Swedish = ${connection.escape(
          body.Swedish
        )}, Russian = ${connection.escape(
          body.Russian
        )} WHERE id = ${connection.escape(body.id)};`;
        connection.query(sql, (error, result) => {
          if (error) reject(error);
          resolve(result);
          connection.release();
          if (err) throw err;
        });
      });
    }),

  /**
   * Description
   * @param {any} user
   * @param {any} pw
   * @returns {any}
   */
  registerUser: (user, pw) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `INSERT INTO Users (user, password) VALUES (${connection.escape(
          user
        )}, ${connection.escape(pw)});`;
        connection.query(sql, (error, result) => {
          if (error) reject(error);
          resolve(result);
          connection.release();
          if (err) throw err;
        });
      });
    }),

  getUser: (user) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `SELECT * FROM Users WHERE user = ${connection.escape(
          user
        )};`;
        connection.query(sql, (error, result) => {
          if (error) reject(error);
          resolve(result);
          connection.release();
          if (err) throw err;
        });
      });
    }),
};

module.exports = connectionFunctions;
