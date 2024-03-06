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

  const order = mongoose.model("orders", ordersSchema);

  module.exports = order;