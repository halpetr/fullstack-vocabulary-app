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
  getAll: () =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        var sql = `select * from Vocabulary`;
        connection.query(sql, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
          connection.release();
        });
      });
    }),
};

module.exports = connectionFunctions;
