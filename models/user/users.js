const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    name : String,
    phone : Number,
    building : String,
    area : String,
    pin : Number,
    state : String,
    landmark : String,
    city : String,
    category : String
})
const cartSchema = new mongoose.Schema({
    product_id : String,
    quantity : Number,
    title:String,
    product_id: Number,
    description: String,
    specifications:[],
    image : String,
    image_id : String,
    category : String,
    discount : Number,
    sell_price : Number,
    status : String,
    quantity : Number,
    seller : String
})
const wishlistSchema = new mongoose.Schema({
    product_id : String
})

const ordersSchema = new mongoose.Schema({
    products : [cartSchema],
    address : addressSchema,
    order_id : String,
    method : String,
    date : String,
    status : String,
    tracking_link : String,
    phone : Number,
    shipping_charge : Number,
    discount : Number,
    total : Number,
})

const usersSchema = new mongoose.Schema({
  name:String,
  customer_id: Number,
  icon: String,
  icon_id:String,
  phone : Number,
  alt_name : String,
  alt_phone : Number,
  dob : String,
  sex : String,
  email : String,
  status : String,
  joined : String,
  purchases : Number,
  address : [addressSchema],
  cart : [cartSchema],
  wishlist : [wishlistSchema],
  orders : [ordersSchema],

})




  
  const user = mongoose.model("customers", usersSchema);

  module.exports = user;