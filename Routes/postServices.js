let express=require('express')
let mongoose=require('./dbConnection')
let router= express.Router();
let multer = require("multer");
let Students=require('./student_model')
let bcrypt=require('bcrypt')


// let studentSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//       minLenght: 3,
//       maxLenght: 30,
//       trim: true,
//       lowercase: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//       minLenght: 3,
//       maxLenght: 30,
//       trim: true,
//       lowercase: true,
//     },
//     email: {
//       type: String,
//       validate: {
//         validator: function (v) {
//           return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
//         },
//         message: (props) => `${props.value} is not a valid email id!`,
//       },
//       required: [true, "User email id required"],
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     confirmPassword: {
//       type: String,
//       required: true,
//     },
//     gender: {
//       type: String,
//       required: true,
//       enum: ["male", "female"],
//       lowercase: true,
//       message: `{VALUE} is not valid gender`,
//     },
//   });
//   let Students = new mongoose.model("student", studentSchema);


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  
  router.use("/uploads", express.static("uploads"));
  
  router.post("/signUp", upload.none(), async(req, res) => {
    console.log(req.body);
    let hashedPassword=await bcrypt.hash(req.body.password,10);
    // console.log(hashedPassword);
    
  let db = async (err, result) => {
      try {
        req.body.name = new Students({
          name: `${req.body.name}`,
          lastName: `${req.body.lastName}`,
          email: `${req.body.email}`,
          password: `${hashedPassword}`,
          confirmPassword: `${req.body.confirmPassword}`,
          gender: `${req.body.gender}`,
        });
        await Students.collection.insertMany([req.body.name]);
        if (err) {
          res.json({ status: "failure", details: err });
        } else {
          res.json({ status: "success", details: result });
        }
      } catch (error) {
        console.log("Something is wrong");
        console.log(error);
      }
    };
    db();
  });

router.post('/login',upload.none(),(req,res)=>{
  // console.log(req.body)
  // res.json(req.body)
  let validateUser= async ()=>{
    try {
      let userData= await Students.find({email:`${req.body.email}`})

      let decryptPassword=await bcrypt.compare(req.body.password, userData[0].password)
      console.log(decryptPassword)
      if(!userData.length){
        res.json({status:"failure", details:"Invalid Email"})
      }
      else if(decryptPassword != true){
        res.json({status:"failure", details:"Invalid Password"})
      }
      else {
        let userDetails={
          name:userData[0].name,
          lastName:userData[0].lastName,
          email:userData[0].email,
          gender:userData[0].gender
        }
        res.json({status:'success', details:userDetails})
      }
    } 
    catch (error) {
      console.log(error)
    }
  }
  validateUser()

})







module.exports=router;