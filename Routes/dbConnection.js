let mongoose=require('mongoose')
let multer = require("multer");



mongoose
  .connect("mongodb://127.0.0.1:27017/usersDB")
  .then(() => {
    console.log("sucessfully connected to Database");
  })
  .catch((err) => {
    console.log("Not connected", err);
  });

 module.exports= mongoose;
