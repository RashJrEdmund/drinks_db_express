const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'drinks_db', // this the name of your drinks database in phpMyadmin
  port: 3306,
})

module.exports = connection.promise();
