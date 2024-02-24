let express = require("express");
let cors = require("cors");
let postServices= require('./Routes/postServices')
let getServices=require('./Routes/getServices')

let app = express();
app.use(cors());
app.use('/',postServices)
app.use('/users',getServices)
app.use(express.json())
// app.use(express.urlencoded())


app.listen(4444, () => {
  console.log("listening to port 4444 ");
});
