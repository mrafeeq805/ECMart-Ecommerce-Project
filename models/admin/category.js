const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name:String,
  category_id: Number,
  icon: String,
  icon_id:String,
  products : Number,
  mainCategory : String,
  status : String
})


  
  const category = mongoose.model("category", categorySchema);

  module.exports = category;