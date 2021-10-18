//////////////////////////////
// Author(s): Zakarya Butt, Tiana Litchfield
// Date Made: 09/09/2021
//////////////////////////////

const mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    familyName: String, 
    firstName: String, 
    email: String, 
    status: String, 
    phoneNumber: String,
    gender: String,
    companyInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'company'},
    meeting: {
        date: String, 
        time: String
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low',]
    },
    progress: {
        type: String,
        enum: ['New', 'Invited', 'Met', 'Negotiation', 'Conclude']
    },
    notes : String 
})

const Customer = mongoose.model("customer", customerSchema); 

module.exports = Customer; 