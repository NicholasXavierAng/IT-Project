const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    familyName: String, 
    firstName: String, 
    email: String, 
    username: String, 
    password: {type: String, required: true},
})

const User = mongoose.model("user", userSchema); 

module.exports = User; 