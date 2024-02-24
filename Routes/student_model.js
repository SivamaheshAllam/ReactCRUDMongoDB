let mongoose=require("mongoose")


let studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 30,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 30,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email id!`,
      },
      required: [true, "User email id required"],
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      lowercase: true,
      message: `{VALUE} is not valid gender`,
    },
  });
//   let Students = new mongoose.model("student", studentSchema);



  module.exports=mongoose.model('student',studentSchema)