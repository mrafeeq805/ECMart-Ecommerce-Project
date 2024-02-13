const mongoose= require('mongoose');
mongoose.set('strictQuery',false);

const db = mongoose
.connect(process.env.MONGO_URL)
db.then(()=>{
    console.log('connected');
})
db.catch(error=>{
    console.log('not connected')
})

module.exports=db