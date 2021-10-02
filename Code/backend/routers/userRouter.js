//////////////////////////////
// Author(s): Zakarya Butt 
// Date Made: 09/09/2021
//////////////////////////////

const userRouter = require('express').Router();
const User = require('../models/user');
const Customer = require('../models/customer');
const Company = require('../models/company'); 
const { Mongoose } = require('mongoose');
const { ObjectId } = require('mongodb');

userRouter.post('/search', async (req, res) => {
    var search = req.body;  
	customers = await Customer.find({
		"$expr": {
		  "$regexMatch": {
			"input": { "$concat": ["$firstName", " ", "$familyName"] },
			"regex": search.words,  //Your text search here
			"options": "i"
		  }
		}
	  });
    res.json({"customers": customers});
})

userRouter.get('/customers', async (req, res) => {
    var customers = await Customer.find().lean(); 
    // console.log(customers); 
    res.json({"customers": customers}); 
})



var addFiltered = (customers, c) => {
	// console.log(customers.includes(c[0])); 
	for (var i = 0 ; i < c.length; i++) {
		if (!customers.includes(c[i])) {
			customers.push(c[i]); 
			// console.log(customers.includes(c[i]))
		}	
  	} 
}

// Removes duplicates from the array.
const removeDuplicates = (arr) => [...new Set(
	arr.map(el => JSON.stringify(el))
)].map(e => JSON.parse(e));


userRouter.post('/filter', async (req, res) => {
  var customers = [] ; 
  if (req.body.new) {
    c = await Customer.find({"status":"New"})
    addFiltered(customers, c); 
  }
  if (req.body.conclude) {
    c = await Customer.find({"status":"Conclude"})
    addFiltered(customers, c);
  }
  if (req.body.invited) {
    c = await Customer.find({"status":"Invited"})
    addFiltered(customers, c);
  }
  if (req.body.met) {
    c = await Customer.find({"status":"Met"})
    addFiltered(customers, c);
  }
  if (req.body.negotiation) {
    c = await Customer.find({"status":"Negotiation"})
    addFiltered(customers, c);
  }
  if (req.body.high) {
    c = await Customer.find({"progress":"High"})
    addFiltered(customers, c);
  }
  if (req.body.medium) {
    c = await Customer.find({"progress":"Medium"})
    addFiltered(customers, c);
  }
  if (req.body.low) {
    c = await Customer.find({"progress":"Low"})
    addFiltered(customers, c);
  }
  customers = removeDuplicates(customers); 
  res.json({"customers":customers});  
})

userRouter.post('/profile/:id', async (req, res) => {
    var customer = await Customer.findById(req.params.id).lean(); 
    var company = await Company.findById(customer.companyId);
    res.json({"customer": customer, "company": company});
})

userRouter.post('/addCustomer', async (req, res) => {
  var client = req.body.client; 
  var company = req.body.company; 
  const newCompany = await Company.create({
    name:company.name,
    department: company.department,
    location: company.location,
    position: company.positon
  })
  
  await newCompany.save(); 

  var comp = await Company.findOne({name:company.name, department: company.department,location: company.location,position: company.positon})

  var compId = comp._id; 
  var customer = await Customer.create({
    firstName: client.firstName, 
    familyName: client.familyName, 
    age: 40, 
    dob: client.dob, 
    gender: client.gender, 
    phoneNumber: client.number, 
    email: client.email, 
    companyInfo: ObjectId(compId), 
    priority: company.priority,
    progress: company.status
  })

  await customer.save(); 
  res.json({status:true});
})

module.exports = userRouter; 

