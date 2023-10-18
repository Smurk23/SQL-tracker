const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: 'uconn',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );
  db.connect(function (error){
    if (error) throw error;
  })
  module.exports = db