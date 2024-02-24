let mongoose=require('./dbConnection')
let express= require('express')
let router=express.Router();
let Students=require('./student_model')




// let usersSchema = new mongoose.Schema({
//     id: String,
//     firstName: String,
//     lastName: String,
//     email: String,
//     gender: String,
//     address: String,
//     city: String,
//     department: String,
//     country: String,
//     designation: String,
//   });
  
//   let User = new mongoose.model("users", usersSchema);
  
  // let saveIntoDb = () => {
  //   try {
  //     let dhoni = new User({
  //       id: 1001,
  //       firstName: "dhoni",
  //       lastName: "MS",
  //       email: "dhnoi@gmail.com",
  //       gender: "M",
  //       address: "Ranchi",
  //       city: "Jarkhand",
  //       department: "cricket",
  //       country: "India",
  //       designation: "Captain",
  //     });
  //     User.insertMany([dhoni])
  //     console.log('inserted successfully')
  //   } catch (error) {
  //     console.log(error)
      
  //   }
  // };
  
  // saveIntoDb();
 

  

 
  router.get('/usersData',(req,res)=>{
      try {
          let getUserDataFromDB=async()=>{
              let fetchdata=await Students.find()
              // .and({country:`${req.query.country}`})
              console.log(fetchdata)
              res.json(fetchdata)
          }
          getUserDataFromDB()
      } catch (error) {
          console.log(error)
          
      }
     
  })
  
  // router.get('/getDataByCountry',(req,res)=>{
  //     console.log(req.query.country)
  //    let getCountryFromDB=async()=>{
  //     let fetchedData= await User.find().and({country:`${req.query.country}`})
  //     res.json(fetchedData);
  //    }
  //    getCountryFromDB();
  // })
  
  
  // router.get('/countriesList', (req, res)=>{
  //    try {
  //     let getCountryListFromDB= async()=>{
  //         let fetchdata=await User.find().select({country:1}).sort({country:1}).distinct('country')
  //         res.json(fetchdata)
  //     }
  //     getCountryListFromDB();
      
  //    } catch (error) {
  //     console.log(error)  
  //    }
  // })
  
  // router.use('/departmentList', (req,res)=>{
  
  //   try {
  //     let getDeptListFromDB=async()=>{
  //     let fetchDeptList=await User.find().select({department:1}).sort({department:1}).distinct('department')
  //     // console.log(fetchDeptList);
  //       res.json(fetchDeptList)
  //   }
  //   getDeptListFromDB();
      
  //   } catch (error) {
  //     console.log(error)
      
  //   }
  // })
  
  // router.get('/getDataByDepartment',(req,res)=>{
  //   console.log(req.query.department)
  //  let getDepartmentFromDB=async()=>{
  //   let fetchedData= await User.find().and({department:`${req.query.department}`})
  //   res.json(fetchedData);
  //  }
  //  getDepartmentFromDB();
  // })
  
  

  module.exports=router;