const mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    familyName: String, 
    firstName: String, 
    age: Number, 
    email: String, 
    phoneNumber: Number,
    companyName: String, //change once schema for company is created
    priority: String, // change once schema for priority is created
    progress: String, // change once schema for progress is created
})

const Customer = mongoose.model("customer", customerSchema); 

module.exports = Customer; 