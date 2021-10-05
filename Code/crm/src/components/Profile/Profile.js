//////////////////////////////
// Author(s): Zakarya Butt, Rebecca Ye, Tiana Litchfield
// Date Made: 12/09/2021
//////////////////////////////

import './Profile.css'; 
import TextField from '@material-ui/core/TextField';
import BackButton from '@material-ui/icons/ArrowBack'; 
import Bell from '@material-ui/icons/Notifications'; 
import Pen from '@material-ui/icons/Create'; 
import { IconButton, AppBar, Toolbar, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import Calendar from 'react-calendar'
// import 'moment-timezone';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

export default function Profile({props}) {

    var [customer, setCustomer] = useState(); 
    var [company, setCompany] = useState(); 
    var [progress, setProgress] = useState();
    var [priority, setPriority] = useState();
    var [lastContact, setLastContact] = useState();
    var [nextMeeting, setNextMeeting] = useState();
    let {id} = useParams();

    const [date, setDate] = useState(false); 
    const [time, setTime] = useState(false);

    const [value, onChange] = useState(new Date());

    
    // Called as soon as the page is loaded.
    useEffect(() => {
        getCustomer();  
    })

    useEffect( ()=> { 
        if (date && time) {
            // var d  = JSON.stringify(date); 
            var req = {"date":date, "time": time};
            // console.log(req);
            axios.post('http://localhost:5000/user/meeting/' + id, req).then(res => {
                var data = res.data.customers;
                console.log(data);
			})
        }

    }, [date, time]); 

     
    // Gets data for the specific customer from the db. 
    async function getCustomer(){
        var req = await fetch('http://localhost:5000/user/profile/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        var data = await req.json(); 
        var cust = data.customer; 
        var comp = data.company; 
        var progress = data.progress
        var priority = data.priority
        var lastContact = data.lastContact;
        var nextMeeting = data.nextMeeting;
        setCustomer(cust); 
        setCompany(comp); 
        setProgress(progress);
        setPriority(priority);
        setLastContact(lastContact);
        setNextMeeting(nextMeeting);
    }

    return(
        <>
        <AppBar position="fixed" color="white" boxShadow={4}>
            <Toolbar>
                <Box 
                    flexGrow={1}>
                    <IconButton edge="start" marginLeft="auto">
                        <BackButton />
                    </IconButton>
                </Box>
                <Box flexGrow={1}>
                    <img class="header" src="/logo.png" alt="logo" width="207" height="55" />
                </Box>
                <IconButton>
                    <Bell />
                </IconButton>
            </Toolbar>
        </AppBar>

        <div className="rectangle"></div>
        <div className="leftContainer">
            <Grid container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item spacing={4}>
                    <Box 
                        boxShadow={4}
                        borderRadius={5}
                        style={{ padding: "15px", margin: "8px" }}>
                        {customer &&
                        <>
                        <p><b>Progress: </b> <span className="contactInfo">{customer.progress}</span></p>
                        </>
                        }     
                    </Box>
                </Grid>

                <Grid item spacing={4}>
                    <Box 
                        boxShadow={4}
                        borderRadius={5}
                        style={{ padding: "15px", margin: "8px" }}>
                        {customer &&
                        <>
                        <p><b>Priority: </b> <span className="contactInfo">{customer.priority}</span></p>
                        </>
                        }     
                    </Box>
                </Grid>

                <Grid item spacing={4}>
                    <Box 
                        boxShadow={4}
                        borderRadius={5}
                        style={{ padding: "15px", margin: "8px" }}>
                        {customer &&
                        <>
                        <Box display="flex" justifyContent="space-between">
                            <centre><h3>LAST CONTACT</h3></centre>
                            <IconButton>
                                <Pen/>
                            </IconButton>
                        </Box>
                        <p><b>Date: </b> <span className="contactInfo"><Moment format="YYYY-mm-dd">{customer.lastContact}</Moment>)</span></p>
                        <p><b>Time:</b> 10:00</p>
                        </>
                        }     
                    </Box>
                </Grid>

                <Grid item spacing={4}>
                    <Box 
                        boxShadow={4}
                        borderRadius={5}
                        style={{ padding: "15px", margin: "8px" }}>
                        {customer &&
                        <>
                        <Box display="flex" justifyContent="space-between">
                            <centre><h3><b>NEXT MEETING</b></h3></centre>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <p><b>Date: </b> <span className="contactInfo"><Moment format="YYYY-mm-dd">{customer.nextMeeting}</Moment></span></p>
                            <Popup trigger={<IconButton><Pen/></IconButton>} position="bottom center">
                                <div>
                                    <Calendar
                                        onChange={(value) => setDate(value)}
                                    />
                                </div>
                            </Popup>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <p><b>Time:</b> 16:00</p>
                            <Popup trigger={<IconButton><Pen/></IconButton>} position="bottom center">
                                <div>
                                <TextField
                                    id="time"
                                    label="Time"
                                    placeholder="16:00"
                                    multiline
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth 
                                    onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>
                            </Popup>
                        </Box>
                        
                        </>
                        }     
                    </Box>
                </Grid>
            </Grid>
        </div>

        <div className="rightContainer">
            <Grid container
                direction="row"
                // justifyContent=""
                alignItems="center"
            >
                <div className="infoContainer">
                    {customer  && 
                        <>
                        <h1>{customer.firstName} {customer.familyName}</h1>
                        <p><b>Age: </b> {customer.age}</p>
                        <p><b>Gender: </b> {customer.gender}</p>
                        </>
                    }
                </div>
                <Grid item spacing={4}>
                    <Box 
                        boxShadow={4}
                        borderRadius={5}
                        style={{ padding: "15px", margin: "10px", width:"25em", marginTop:"2em"}}>
                        <Box display="flex" justifyContent="space-between">
                            <h3>Contact</h3>
                            <IconButton>
                                <Pen/>
                            </IconButton>
                        </Box>
                        {customer &&
                        <>
                        <p><b>Mobile: </b> <span className="contactInfo">{customer.phoneNumber}</span></p>
                        <p><b>Email: </b> <span className="contactInfo">{customer.email}</span></p> 
                        </>
                        }     
                    </Box>
                </Grid>
            </Grid>

            <Grid container
                direction="row"
                // justifyContent="space-between"
                alignItems="center"
            >
                <Grid item spacing={5}>
                    <Box 
                        boxShadow={4}
                        borderRadius={5}
                        style={{ padding: "15px", margin: "8px", width:"25em", marginRight:"7.5em", height:"15em"}}>
                        <Box display="flex" justifyContent="space-between">
                            <h3>Company Information</h3>
                            <IconButton>
                                <Pen/>
                            </IconButton>
                        </Box>
                        {company &&
                        <>
                            <p><b>Name: </b> <span className="contactInfo">{company.name}</span></p>
                            <p><b>Location: </b> <span className="contactInfo">{company.location}</span></p>
                            <p><b>Position: </b> <span className="contactInfo">{company.position}</span></p>
                            <p><b>Department: </b> <span className="contactInfo">{company.department}</span></p>
                        </>
                        }
                    </Box>
                </Grid>
                <Grid item spacing={5}>
                    <Box 
                        boxShadow={4}
                        borderRadius={5}
                        style={{ padding: "15px", width:"25em", height:"15em"}}>
                        <Box display="flex" justifyContent="space-between">
                            <h3>Task Information</h3>
                            <IconButton>
                                <Pen/>
                            </IconButton>
                        </Box>
                    <p><b>High level description: </b> <span className="contactInfo">...</span></p>
                    <p><b>Timeline: </b> <span className="contactInfo">...</span></p>
                    </Box>
                </Grid>
            </Grid>
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="centre"
                spacing={24}
            >
                <Grid item spacing={5}>
                    <Box 
                        boxShadow={4}
                        borderRadius={5}
                        style={{ padding: "15px", margin: "8px" , width:"60em", height:"10em", marginTop:"2em"}}>
                        <Box display="flex" justifyContent="space-between">
                            <h3>Notes</h3>
                            <IconButton>
                                <Pen/>
                            </IconButton>
                        </Box>
                    <section class="notes">
                        <TextField
                        id="notes"
                        label="Editing notes"
                        placeholder="Write notes here"
                        multiline
                        variant="outlined"
                        color="secondary"
                        fullWidth 
                        />
                    </section>
                    </Box>
                </Grid>    
            </Grid>
        </div>
        </>
    )    
}