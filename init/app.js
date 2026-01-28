// in the database first we need to create a database then we can connect with it .
//after create database and connect with it then we create table by making query from js file 

// put sample data inside the database 
let generateUserData = require("./data.js"); // EXECUTES the file once Then exports its result
const mysql = require('mysql2');

let userData = generateUserData(100); // if you  want random data  then execute this line 





// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: "Premhada@123"
});

//let q = "CREATE TABLE amazon_employee (id VARCHAR(20)NOT Null ,employee_name VARCHAR(20) NOT Null,post VARCHAR(20) NOT Null )";
// q = "INSERT INTO user VALUES (?);";
// data=["12gdstlmhdft2","krishna@123","krishna@gmail.com","krishna@123"];

// A simple SELECT query
const truncateQuery = "TRUNCATE TABLE `user`";

// Treated as an identifier
// MySQL understands it as:
// table name
// column name
// database name
// Works even if the name is a reserved keyword

const insertQuery = "INSERT INTO `user` VALUES ?";


connection.query(truncateQuery, (err) => {
  if (err) {
    console.error("Truncate failed:", err);
    return;
  }

  connection.query(insertQuery, [userData], (err, result) => {
    if (err) {
      console.error("Insert failed:", err);
      return;
    }

    console.log("Rows inserted:", result.affectedRows, result );
    connection.end();
  });
});

