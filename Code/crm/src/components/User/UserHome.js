//////////////////////////////
// Author(s): Terry, Zakarya Butt, Rebecca Ye
// Date Made: 09/09/2021
//////////////////////////////

import React, { useState ,useEffect} from 'react';
import Topbar from '../MainPageComponents/Topbar';
import Line3 from '../MainPageComponents/Line3';
// import ClientToggle from '../MainPageComponents/ClientToggle';
// import Searchbar from '../MainPageComponents/Searchbar';
// import Provider from '../MainPageComponents/Provider'; 
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

function UserHome() {
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



	const logOut = async (e) => {
	  e.preventDefault();
	  localStorage.clear();
	  window.location.href = '/';
	}
  
	const editInfo = async (e) => {
	  e.preventDefault();
	  window.location.href = '/edit_information';
	}
  
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
		axios.post('http://localhost:5000/user/filter', filters).then(res => {
		  var data = res.data.customers;
		  if (data.length > 0) {
			setCustomers(data);
		  }  
		}) 

	  } 
	}, [newCustomer, invite, met, negotiation, conclude, high, medium, low]); 

	const getCustomers = () => {
	  // Sends a request to the backend to get all customers
	  axios.get('http://localhost:5000/user/customers').then(res => {
		  var data = res.data.customers; 
		  setCustomers(data); 
	  }) 
	}
	
	const searchWord = (e) => {
	  // e.preventDefault(); 
	  if (e == "") {
		setSearch(false); 
	  }
	  else {
		if (!isNaN(e)) {
		  // Its a number
		  setSearchWord(e); 
		  setNumber(true); 
		}
		else {
		  // Its a name
		  setSearchWord(e); 
		  setNumber(false);
		}
	  }
	}
	

	const doSearch = async (e) => {
		e.preventDefault(); 
		const req = {"words":words, "number":number}; 
		axios.post('http://localhost:5000/user/search', req).then(res => {
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
                <SearchBar
                value=""
                onChange={e => searchWord(e)}
                placeholder={"Search for contacts"}
                />
            </form>
          </div>
          <Line3/>
          <svg width="1104" height="4" viewBox="0 0 1104 4" fill="none" xmlns="http://www.w3.org/2000/svg" style = {{paddingLeft: '330px', paddingBottom: '20px'}}>
          <path d="M0 2L1104 2.35158" stroke="#C4C4C4" stroke-opacity="0.5" stroke-width="2.08177"/>
          </svg>
          <Button
            type="logout"
            variant="contained"
            color="secondary"
            style={{minWidth: "85px", minHeight:"35px"}}
            onClick={logOut}>
            Log out
          </Button>
          <Button
            type="editInfo"
            variant="contained"
            color="secondary"
            style={{minWidth: "85px", minHeight:"35px"}}
            onClick={editInfo}>
            Edit Inforation
          </Button>
          <Button
            type="editPw"
            variant="contained"
            color="secondary"
            style={{minWidth: "85px", minHeight:"35px"}}
            onClick={editPw}>
            Change Password
          </Button>
          <div className = "lowerpart">
                    <div className = "sidebar">
                        <div className = "p" style ={{fontSize: "25px", paddingLeft: "5px", paddingBottom: "10px",textAlign: "left", textDecoration: "underline"}}>
                            Filter By:
                        </div>
                        <div className = "filterBar">
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
                    </div>
                    <div className = "clients" >
                        {customers && customers.map(d => (
                            <>
                                {/* A loop to handle customers directly from the database  */}
                                <button className = "client" onClick={()=> window.location.href='/user/profile/' + d._id}>
                                <p className = "name">{d.firstName} {d.familyName}</p>
                                <p className = "status">{d.status}</p>
                                <p className = "progress">{d.progress}</p>
                                </button>
                                <svg width="1104" height="4" viewBox="0 0 1104 4" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M0 2L1104 2.35158" stroke="#C4C4C4" stroke-opacity="0.5" stroke-width="2.08177"/>
                                </svg>
                            </>
                         ))}   
                    </div>
            </div>
      </div>
    );
  }
  
  export default UserHome;