//////////////////////////////
// Author(s): Zakarya Butt 
// Date Made: 09/09/2021
//////////////////////////////

const userRouter = require('express').Router();
const User = require('../models/user');
const Customer = require('../models/customer');

userRouter.post('/search', async (req, res) => {
    var search = req.body.words;
    // Need to make this into a regex. 
    customers = await Customer.findOne({firstName: search});
    // console.log(user)
    // res.json({"customers": customers});
})

userRouter.get('/customers', async (req, res) => {
    var customers = await Customer.find().lean(); 
    res.json({"customers": customers}); 
})

module.exports = userRouter; 

