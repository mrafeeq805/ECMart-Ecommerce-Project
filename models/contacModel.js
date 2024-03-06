const mongoose= require('mongoose');
mongoose.set('strictQuery',false);

const db = mongoose
.connect("mongodb://127.0.0.1:27017/images")
db.then(()=>{
  console.log('connected');
})
db.catch((error)=>{
  console.log(error);
});


const contactschema = new mongoose.Schema(
    {
      
      name:String,
      phone:Number,
      email:String,
      place:String,
      category:String,
      code:String
    }
  );

  const userschema = new mongoose.Schema(
    {
      
      email:String,
      password:String,
      user_id:String,
      contacts:[contactschema]
    }
  );
  
  const usersModel = mongoose.model("users",userschema);

  module.exports=usersModel;