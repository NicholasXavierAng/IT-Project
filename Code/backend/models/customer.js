//////////////////////////////
// Author(s): Zakarya Butt, Tiana
// Date Made: 09/09/2021
//////////////////////////////

const mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    familyName: String, 
    firstName: String, 
    age: Number, 
    email: String, 
    status: String, 
    phoneNumber: Number,
    companyName: String, //change once schema for company is created
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low',]
    },
    progress: {
        type: String,
        enum: ['New', 'Invited', 'Met', 'Negotiation', 'Conclude']
    },
})

const Customer = mongoose.model("customer", customerSchema); 

module.exports = Customer; 