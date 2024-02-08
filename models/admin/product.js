const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title:String,
  product_id: Number,
  description: String,
  specifications:[],
  price : Number,
  image : String,
  image_id : String,
  category : String,
  discount : Number,
  sell_price : Number,
  price : Number,
  status : String,
  quantity : Number,
  seller : String
})


  
  const product = mongoose.model("product", productSchema);

  module.exports = product;