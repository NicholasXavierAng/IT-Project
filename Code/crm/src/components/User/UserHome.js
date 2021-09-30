//////////////////////////////
// Author(s): Terry, Zakarya Butt, Rebecca Ye
// Date Made: 09/09/2021
//////////////////////////////

import React, { useState ,useEffect} from 'react';
import Topbar from '../MainPageComponents/Topbar';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

// import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Sort from '@material-ui/icons/Sort';
import Popup from 'reactjs-popup';
import { IconButton } from '@material-ui/core';

function UserHome() {
	const config = require('../Configuration/config.json');
	const link =  config.API_URL; 
	console.log(process.env.REACT_APP_BASE_URL); 
	const [customers, setCustomers] = useState();
	// For search
	const [search, setSearch] = useState(false);  
	const [words, setSearchWord] = useState();
	const [number, setNumber] = useState(false);
	// For progress
	const [newCustomer, setNew] = useState(false);
	const [invite, setInvite] = useState(false);
	const [met, setMet] = useState(false);
	const [negotiation, setNegotiation] = useState(false);
	const [conclude, setConclude] = useState(false);
	// For priority
	const [high, setHigh] = useState(false);
	const [medium, setMedium] = useState(false);
	const [low, setLow] = useState(false);
  
	const editPw = async (e) => {
	  e.preventDefault();
	  window.location.href = '/edit_password';
	}

	// If we detect a change in the search property then this is run.
	useEffect(()=> {
	  if (!search) {
		getCustomers();
	  } 
	}, [search]); 

	// If we detect a change in the filter then this is run.
	useEffect(()=> { 
	  var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low; 
	  if (!filter) {
		getCustomers(); 
	  }
	  else {
		const filters = {"new":newCustomer, "invite": invite, "met": met, "negotiation":negotiation, "conclude":conclude, "high":high, "medium":medium, "low":low}; 
		axios.post(link + 'user/filter', filters).then(res => {
		  var data = res.data.customers;
		  if (data.length > 0) {
			setCustomers(data);
		  }  
		}) 

	  } 
	}, [newCustomer, invite, met, negotiation, conclude, high, medium, low]); 

	const getCustomers = () => {
	  // Sends a request to the backend to get all customers
	  axios.get(link + 'user/customers').then(res => {
		  var data = res.data.customers; 
		  setCustomers(data); 
	  }) 
	}
	
	const searchWord = (e) => {
	  // e.preventDefault(); 
	  console.log(e); 
	  if (e == "") {
		setSearch(false); 
	  }
	  else {
		if (!isNaN(e)) {
		  // Its a number
		  setSearchWord(e); 
		  setNumber(true); 
		  const req = {"words":words, "number":e}; 
		  axios.post(link + 'user/search', req).then(res => {
			var data = res.data.customers; 
			if (data.length > 0) {
			  setSearch(true);
			  var cust = data; 
			  setCustomers(cust);
			} 
		})
		}
		else {
		  // Its a name
		  setSearchWord(e); 
		  setNumber(false);
		  const req = {"words":e, "number":number}; 
		  axios.post(link + 'user/search', req).then(res => {
			var data = res.data.customers; 
			if (data.length > 0) {
			  setSearch(true);
			  var cust = data; 
			  setCustomers(cust);
			} 
		})
		  
		}
	  }
	}
	

	const doSearch = async (e) => {
		e.preventDefault(); 
		const req = {"words":words, "number":number}; 
		axios.post(link + 'user/search', req).then(res => {
		  var data = res.data.customers; 
		  if (data.length > 0) {
			setSearch(true);
			var cust = data; 
			setCustomers(cust);
		  } 
	  })
	}


	return (
	  <div className="App">
		  <Topbar/>
		  <br/>
		  <div className = "searchbar">
			<form onSubmit={doSearch}>        
				{/* can handle searches */}
				<Box pl={38}>
					<SearchBar
					value=""
					onChange={e => searchWord(e)}
					placeholder={"Search for contacts"}
					style={{maxWidth: "1000px", maxHeight:"56px"}}
					/>
				</Box>
			</form>
		  </div>
		  <div className ='line3'>
			<section class="createContact"></section>
			<div className="titles" style ={{fontWeight: 'bold'}}>
				<p className="p">Name</p> 
				<p className="p">Progress</p>  
				<p className="p">Priority</p>

				<Popup trigger={<IconButton><Sort /></IconButton>} position="bottom center">
							<div>
								<div className= "p" style ={{textAlign: "left"}}>
									Progress
								</div>
								<div style ={{paddingLeft: "10px"}}>
								<Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
								<FormControlLabel
									label="New"
									control={<Checkbox checked={newCustomer} onChange={() => setNew(!newCustomer)} />}
								/>
								<FormControlLabel
									label="Invited"
									control={<Checkbox checked={invite} onChange={() => setInvite(!invite)} />}
								/>
								<FormControlLabel
									label="Met"
									control={<Checkbox checked={met} onChange={() => setMet(!met)} />}
								/>
								<FormControlLabel
									label="Negotiation"
									control={<Checkbox checked={negotiation} onChange={() => setNegotiation(!negotiation)} />}
								/>
								<FormControlLabel
									label="Conclude"
									control={<Checkbox checked={conclude} onChange={() => setConclude(!conclude)} />}
								/>
								</Box>
							</div>
							<div className= "p" style ={{textAlign: "left"}}>
								Priority
							</div>
							<div style ={{paddingLeft: "10px"}}>
								{/* {childrenPriority} */}
								<Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
								<FormControlLabel
									label="High"
									control={<Checkbox checked1={high} onChange={() => setHigh(!high)} />}
								/>
								<FormControlLabel
									label="Medium"
									control={<Checkbox checked1={medium} onChange={() => setMedium(!medium)} />}
								/>
								<FormControlLabel
									label="Low"
									control={<Checkbox checked1={low} onChange={() => setLow(!low)} />}
								/>
								</Box>
							</div>

							</div>
				</Popup>
			</div>
			
	
		</div>
		  <hr width="67%" align="center"/>
		  <br/>
		  <div className = "lowerpart">
				<div className = "sidebar"></div>
				<div className = "clients" >
					<Box
					borderRadius={16}
					width={1000}
					height={1080}
					boxShadow={6}>
					{customers && customers.map(d => (
						<>
							{/* A loop to handle customers directly from the database  */}
							<button className = "client" onClick={()=> window.location.href='/user/profile/' + d._id}>
							<p className = "name">{d.firstName} {d.familyName}</p>
							<p className = "status">{d.status}</p>
							<p className = "progress" style ={{fontWeight: 'bold', color: d.progress === 'High' ? "Red" : d.progress === 'Medium' ? "Orange" : d.progress === "Low" ? "Green": "Yellow"}}>{d.progress}</p>
							</button>
							<hr width="95%" align="center"/>
						</>
					))}
						
					{/* total number of contacts */}
					<div className="total">
						<p>{customers && customers.length} contact(s).</p>
					</div>
					</Box>   
				</div>
			</div>
	  </div>
	);
  }
  
  export default UserHome;