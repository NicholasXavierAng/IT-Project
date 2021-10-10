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
	sort = false; 
	filter = filters.new || filters.conclude || filters.invite ||filters.met || filters.negotiation || filters.high || filters.medium || filters.low; 
	if (filters.alpha) {
		if (!filter) {
			c = await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"] },"regex": search.words,  "options": "i"}}}).sort({firstName: 1})
			addFiltered(customers, c);
		}
		sort = true; 
	}

	if (filters.new) {
		c = sort == false ? await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "New"}): await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "New" }.sort({firstName: 1})) ;
		addFiltered(customers, c);
	}
	if (filters.conclude) {
		c = sort == false ? await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Conclude"}) : await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Conclude"}.sort({firstName: 1}))
		addFiltered(customers, c);
	}	
	if (filters.invited) {
		c = sort == false ? await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Invited"}) : await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Invited"}.sort({firstName: 1}))
		addFiltered(customers, c);
	}	
	if (filters.met) {
		c = sort == false ? await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Met"}): await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Met"}.sort({firstName: 1}))
		addFiltered(customers, c);
	}	
	if (filters.negotiation) {
		c = sort == false ? await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Negotiation"}): await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "progress": "Negotiation"}.sort({firstName: 1}))
		addFiltered(customers, c);
	}	
	if (filters.high) {
		c = sort == false ? await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "priority":"High"}): await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "priority":"High"}.sort({firstName: 1}))
		addFiltered(customers, c);
	}	
	if (filters.medium) {
		c = sort == false ? await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "priority":"Medium"}): await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "priority":"Medium"}.sort({firstName: 1}))
		addFiltered(customers, c);
	}	
	if (filters.low) {
		c = sort == false ? await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "priority":"Low"}): await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"]},"regex": search.words, "options": "i"}}, "priority":"Low"}.sort({firstName: 1}))
		addFiltered(customers, c);
	}	
	return customers; 
}

userRouter.post('/searchFilter', async (req, res) => {
    var search = req.body; 
	var filters = search.filters;  
	var customers = [] ; 
	customers = await searchAndFilter(filters, search); 		  
	customers = removeDuplicates(customers);  
    res.json({"customers": customers});
})


userRouter.post('/search', async (req, res) => {
    var search = req.body;   
	var customers = [] ; 
	customers = await justSearch(search);
	customers = removeDuplicates(customers);  
    res.json({"customers": customers});
})

const justSearch = async (search) => {
	customers = [] 
	c = search.alpha ? await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"] },"regex": search.words,  "options": "i"}}}): await Customer.find({"$expr": {"$regexMatch": {"input": { "$concat": ["$firstName", " ", "$familyName"] },"regex": search.words,  "options": "i"}}}).sort(); 
	addFiltered(customers, c); 
	return customers;
}

userRouter.get('/customers', async (req, res) => {
    var customers = await Customer.find().lean();  
    res.json({"customers": customers}); 
})

var addFiltered = (customers, c) => {
	for (var i = 0 ; i < c.length; i++) {
		if (!customers.includes(c[i])) {
			customers.push(c[i]); 
		}	
  	} 
}

// Removes duplicates from the array.
const removeDuplicates = (arr) => [...new Set(
	arr.map(el => JSON.stringify(el))
)].map(e => JSON.parse(e));


const justFilter = async (filters) => {
	customers = [] 
	sort = false; 
	filter = filters.new || filters.conclude || filters.invite ||filters.met || filters.negotiation || filters.high || filters.medium || filters.low; 
	
	if (filters.alpha) {
		if (!filter) {
			c = await Customer.find().sort({firstName: 1});
			addFiltered(customers, c);
		}
		sort = true; 
	}
	if (filters.new) {
		c = sort == false ? await Customer.find({"progress":"New"}): await Customer.find({"progress":"New"}).sort({firstName: 1}); 
		addFiltered(customers, c); 
	}
	if (filters.conclude) {
		c = sort == false ? await Customer.find({"progress":"Conclude"}) : await Customer.find({"progress":"Conclude"}).sort({firstName: 1}); 
		addFiltered(customers, c);
	}
	if (filters.invite) {
		c = sort == false ? await Customer.find({"progress":"Invited"}) : await Customer.find({"progress":"Invited"}).sort({firstName: 1}); 
		addFiltered(customers, c);
	}
	if (filters.met) {
		c = sort == false ? await Customer.find({"progress":"Met"}) : await Customer.find({"progress":"Met"}).sort({firstName: 1}); 
		addFiltered(customers, c);
	}
	if (filters.negotiation) {
		c = sort == false ? await Customer.find({"progress":"Negotiation"}) : await Customer.find({"progress":"Negotiation"}).sort({firstName: 1}); 
		addFiltered(customers, c);
	}
	if (filters.high) {
		c = sort == false ? await Customer.find({"priority":"High"}) : await Customer.find({"priority":"High"}).sort({firstName: 1}); 
		addFiltered(customers, c);
	}
	if (filters.medium) {
		c = sort == false ? await Customer.find({"priority":"Medium"}) : await Customer.find({"priority":"Medium"}).sort({firstName: 1}); 
		addFiltered(customers, c);
	}
	if (filters.low) {
		c = sort == false ? await Customer.find({"priority":"Low"}) : await Customer.find({"priority":"Low"}).sort({firstName: 1}); 
		addFiltered(customers, c);
	}
	return customers; 
}

userRouter.post('/filter', async (req, res) => {
	var search = req.body; 
	var filters = search.filters;  
	var customers = [] ; 
	customers = await justFilter(filters);
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

userRouter.post('/meeting/:id', async (req, res) => {
	var customer = await Customer.findById(req.params.id);
	customer.meeting.date = req.body.date; 
	customer.meeting.time = req.body.time; 
	await customer.save(); 
	res.json({"status":true}); 
})

userRouter.post('/progress/:id', async (req, res) => {
	console.log("A");
	var customer = await Customer.findById(req.params.id);
	console.log(req.body.progress); 
	customer.progress =  req.body.progress; 
	await customer.save(); 
	res.sendStatus(200); 
})

module.exports = userRouter; 

