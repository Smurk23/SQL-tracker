const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: 'uconn',
      database: 'company_db'
    })
  // db.createConnection(function (error){
  //   if (error) throw error;
  // })
  module.exports = db