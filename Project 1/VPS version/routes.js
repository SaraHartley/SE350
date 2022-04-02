//routes.js
//this is our simple Nodejs server

//require('dotenv').config(); //instatiate environment variables

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  //connectionLimit : CONFIG.db_connectionlimit,
  host     : 'localhost',
 // user     : 'root',
  user     : 'francesco',
  //password : '',
 // password : 'rootpassword',
  password : 'some_pass', 
 database : 'ReactDb'
});

// Starting our app.
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post('/newUser', function (req, res) {
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.fullName);

  console.log("at post");

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {

    var email = req.body.email;
    var password =req.body.password;
    var fullName =req.body.fullName;
    connection.query(`INSERT INTO rorrusers (rorrEmail,rorrPassword,rorrFullName) values("${email}","${password}","${fullName}")`, function (error, results, fields) {

    /*var sql = "INSERT INTO users (username) value ?";
    var value = req.body.username;
    connection.query(sql,value, function (error, results, fields) {*/

      // If some error occurs, we throw an error.
      /*if (error) {
        res.send(JSON.stringify(error));
      };//throw error;*/

      /*if (error) {
        alert(error);
      };//throw error;*/

      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});

// Creating a GET route that returns data from the 'users' table.
app.get('/rorrUsers', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT rorrEmail, rorrPassword FROM rorrusers', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://34.68.45.171:3000/rorrUsers so you can see the data.');
});