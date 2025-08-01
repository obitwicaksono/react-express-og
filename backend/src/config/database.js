const mysql = require('mysql2');

// Konfigurasi koneksi ke MySQL
const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

module.exports = dbPool.promise();
