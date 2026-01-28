// this is the entry point of project and it used to start server 
require('dotenv').config()

const app = require("./app.js")
let port = process.env.PORT;
app.listen(port, () => {
  console.log("app is listening on the port", port);
})
