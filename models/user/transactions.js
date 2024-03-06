const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    payment_id : String,
    phone : Number,
    method : String,
    date : String,
    amount : Number,
    status : String,
    transaction_id : Number
})
const transactions = mongoose.model("transactions", transactionSchema);

module.exports = transactions;