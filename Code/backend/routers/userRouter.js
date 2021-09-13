//////////////////////////////
// Author(s): Zakarya Butt 
// Date Made: 09/09/2021
//////////////////////////////

const userRouter = require('express').Router();
const User = require('../models/user');
const Customer = require('../models/customer');
const Company = require('../models/company'); 

userRouter.post('/search', async (req, res) => {
    var search = req.body.words;
    // Need to make this into a regex. 
    customers = await Customer.findOne({firstName: search});
    // console.log(user)
    // res.json({"customers": customers});
})

userRouter.get('/customers', async (req, res) => {
    var customers = await Customer.find().lean(); 
    // console.log(customers); 
    res.json({"customers": customers}); 
})

userRouter.post('/profile/:id', async (req, res) => {
    var customer = await Customer.findById(req.params.id).lean(); 
    var company = await Company.findById(customer.companyId);
    res.json({"customer": customer, "company": company});
})


module.exports = userRouter; 

