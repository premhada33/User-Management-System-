const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mysql = require('mysql2');
const ejsMate = require('ejs-mate');
const path = require("path");
require('dotenv').config()


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));// important line to run server or serve ejs file from anywhere
// app.use(express.static(path.join(__dirname, "/public"))); also try
app.use(express.static(path.join(__dirname, "public")));// important line to run server or serve static  file from anywhere

app.use(express.urlencoded({ extented: true }));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);






// // Create the connection to database

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: `${process.env.SQL_PASSWORD}`,
});


// console.log(connection);


// index route -> fetch all data from database and show on web page by help of ejs file 
app.get("/user", (req, res) => {
  let q = "SELECT * FROM user"
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      let userData = result;
      // console.log(userData);
      res.render("users/index.ejs", { userData });
    })
    //   console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
});

// delete page to verify email and password then delete user 
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  // console.log(id);

  try {
    let q = `SELECT * FROM user WHERE id="${id}"`;
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      let userData = result[0];
      //  console.log(userData);
      res.render("users/delete.ejs", { userData });
    })
  } catch {
    (err) => {
      res.send("some error occured ", err);
    }
  }



})

// handle  delete route  to delete user from database
app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { email: form_email, password: form_password } = req.body;

  try {
    let q = `SELECT * FROM user WHERE id="${id}"`;
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      let userData = result[0];
      // now checking condition if email and and password is correct or not 

      if (form_email === "" && form_password === "") {
        res.status(400).json({
          success: false,
          message: "Please fill username or password "
        });
      }

      else if (userData.email != form_email) {
        res.status(400).json({
          success: false,
          message: "Invalid EMAIL"
        });
      }
      else if (userData.password != form_password) {
        res.status(400).json({
          success: false,
          message: "Invalid PASSWORD"
        });
      }

      else {
        // now we are writing second query 

        try {
          let q2 = `DELETE FROM user WHERE id="${id}" `; // always send q2 to delete user 
          connection.query(q2,(err,result)=>{
            if (err) throw err;
            console.log(result,"succesful");
            res.redirect("/user");
          })

        }
        catch {
          (err) => {
            res.send("some error occured ", err);
          }
        }
      }



    })
  }
  catch {
    (err) => {
      res.send("some error occured ", err);
    }
  }
})

// show route -> to show page to edit username  it should be above otherwise it try match with new route 
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  // console.log(id);

  try {
    let q = `SELECT * FROM user WHERE id="${id}"`;
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      // let {id, username, email , password} = {...result[0]};
      // let userData = [id, username, email, password];
      let userData = result[0];
      // console.log(userData);
      res.render("users/edit.ejs", { userData });
      // res.send(" request working");
    })
  }
  catch {
    (err) => {
      res.send("some error occured ", err);
    }
  }
});


//update edited username into database 
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { username: form_username, password: form_password } = req.body;
  //  console.log("form username",form_username);
  console.log("form password ", form_password);
  //  console.log(id);

  try {
    let q = `SELECT * FROM user WHERE id="${id}"`;

    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      let userData = result[0];
      console.log("Real password", userData.password);

      // here condition checking that passowrd is correct or not 
      if (form_username === "" && form_password === "") {
        res.status(400).json({
          success: false,
          message: "Please fill username or password "
        });
      }

      else if (userData.password != form_password) {
        res.status(400).json({
          success: false,
          message: "Invalid PASSWORD"
        });
      }


      else {
        // UPDATE QUERY
        let query2 = `UPDATE user SET username="${form_username}" WHERE id="${id}"`;
        try {
          connection.query(query2, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect("/user");
          })
        }
        catch {
          (err) => {
            res.send("some error occured ", err);
          }
        }
      }


    })
  }
  catch {
    (err) => {
      res.send("some error occured ", err);
    }
  }
})

// new route -to serve a web page to add new user 
app.get("/user/new", (req, res) => {
  res.render("users/new.ejs");
});

// update route -> to add new user to database 
app.post("/user", (req, res) => {
  let { id, username, email, password } = req.body;
  let userData = [id, username, email, password];
  // console.log(userData);
  // res.send("<h1>your post request working </h1>")
  try {
    let q = "INSERT INTO `user` VALUES (?)";
    connection.query(q, [userData], (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.redirect("/user");
    })
  }
  catch {
    (err) => {
      res.send("some error occured", err);
    }
  }
});


module.exports = app;






