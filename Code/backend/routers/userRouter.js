//////////////////////////////
// Author(s): Zakarya Butt 
// Date Made: 09/09/2021
//////////////////////////////

const userRouter = require('express').Router();
const Customer = require('../models/customer');
const Company = require('../models/company'); 
const { ObjectId } = require('mongodb');


const searchAndFilter = async (filters, search) => {
	customers = []
	if (filters.new) {
		c = await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "New"});
		addFiltered(customers, c);
	}
	if (filters.conclude) {
		c = await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Conclude"});
		addFiltered(customers, c);
	}	
	if (filters.invited) {
		c = await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Invited"});
		addFiltered(customers, c);
	}	
	if (filters.met) {
		c = await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Met"});
		addFiltered(customers, c);
	}	
	if (filters.negotiation) {
		c = await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Negotiation"});
		addFiltered(customers, c);
	}	
	if (filters.high) {
		c = await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "priority":"High"});
		addFiltered(customers, c);
	}	
	if (filters.medium) {
		c = await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "priority":"Medium"});
		addFiltered(customers, c);
	}	
	if (filters.low) {
		c = await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "priority":"Low"});
		addFiltered(customers, c);
	}	
	return customers; 
}
userRouter.post('/search', async (req, res) => {
    var search = req.body; 
	var filters = search.filters;  
	var customers = [] ; 
	if (!search.filter) {
		c = await Customer.find({
			"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"] },"regex": search.words,  "options": "i"}}});
			addFiltered(customers, c); 
		}
	else {
		customers = await searchAndFilter(filters, search); 		 
	}
	customers = removeDuplicates(customers);  
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
	var search = req.body; 
	var filters = search.filters;  
	var customers = [] ; 
	// console.log("AA"); 
	// console.log(search); 
	if (!search.search) {
		if (filters.new) {
			c = await Customer.find({"progress":"New"})
			addFiltered(customers, c); 
		}
		if (filters.conclude) {
			c = await Customer.find({"progress":"Conclude"})
			addFiltered(customers, c);
		}
		if (filters.invited) {
			c = await Customer.find({"progress":"Invited"})
			addFiltered(customers, c);
		}
		if (filters.met) {
			c = await Customer.find({"progress":"Met"})
			addFiltered(customers, c);
		}
		if (filters.negotiation) {
			c = await Customer.find({"progress":"Negotiation"})
			addFiltered(customers, c);
		}
		if (filters.high) {
			c = await Customer.find({"priority":"High"})
			addFiltered(customers, c);
		}
		if (filters.medium) {
			c = await Customer.find({"priority":"Medium"})
			addFiltered(customers, c);
		}
		if (filters.low) {
			c = await Customer.find({"priority":"Low"})
			addFiltered(customers, c);
		}
	}
	else if (search.search && search.filter){
		customers = await searchAndFilter(filters, search); 
	}
	else {
		c = await Customer.find({
			"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"] },"regex": search.words,  "options": "i"}}});
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

  console.log(company.priority); 

  await customer.save(); 
  res.json({status:true});
})

module.exports = userRouter; 

