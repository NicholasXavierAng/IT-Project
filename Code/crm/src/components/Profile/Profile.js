//////////////////////////////
// Author(s): Zakarya Butt, Rebecca Ye, Tiana Litchfield, Terry Tran, Nicholas Ang
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
import { useEffect, useState, Fragment } from 'react';
import Moment from 'react-moment';
import Calendar from 'react-calendar'
// import 'moment-timezone';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';

export default function Profile({props}) {
    const config = require('../Configuration/config.json');
    const link =  config.API_URL; 
    var [customer, setCustomer] = useState(); 
    var [company, setCompany] = useState(); 
    var [progress, setProgress] = useState();
    var [priority, setPriority] = useState();
    var [lastContact, setLastContact] = useState();
    var [nextMeeting, setNextMeeting] = useState();
    var [notes, setNotes] = useState();
    var [description, setDescription] = useState();
    var [timeline, setTimeline] = useState();
    let {id} = useParams();

    const [date, setDate] = useState(false); 
    const [time, setTime] = useState(false);

    const homepage = async (e) => {
        e.preventDefault();
        window.location.href = '/';
    }

    // Called as soon as the page is loaded.
    useEffect(() => {
        // Gets data for the specific customer from the db. 
        async function getCustomer(){
            try {
                axios.post(link + 'user/profile/' + id)
                .then(res => {
                    var data = res.data; 
                    var cust = data.customer; 
                    var comp = data.company; 
                    var prog = cust.progress;
                    var priority = cust.priority;
                    var lastContact = cust.lastContact;
                    var nextMeeting = cust.nextMeeting;
                    setCustomer(cust); 
                    setCompany(comp); 
                    setProgress(prog);
                    setPriority(priority);
                    setLastContact(lastContact);
                    setNextMeeting(nextMeeting);
                })
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }

        }

        getCustomer();  
    })

    useEffect( ()=> { 
        if (date && time) {
            var d = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();  
            var req = {"date":d, "time": time};
            try {
                axios.post(link + 'user/meeting/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }

    }, [date, time]); 

    useEffect( ()=> { 
        if (notes) {
            try {
                var req = {"notes":notes}; 
                axios.post(link + 'user/notes/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        if (description) {
            try {
                var req = {"description":description}; 
                axios.post(link + 'user/description/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        if (timeline) {
            try {
                var req = {"timeline":timeline}; 
                axios.post(link + 'user/timeline/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        

    }, [notes, description, timeline]); 


    async function changeProgress(progress) {
        var req = {"progress": progress}
        setProgress(progress);
        try {
            axios.post(link + 'user/progress/' + id, req)
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    } 

    async function changePriority(priority) {
        var req = {"priority": priority}
        setPriority(priority);
        try {
            axios.post(link + 'user/priority/' + id, req)
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    } 

    async function changeLastContact(lastContact) {
        var req = {"lastContact": lastContact}
        setLastContact(lastContact);
        try {
            axios.post(link + 'user/priority/' + id, req)
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    } 

    return(
        <>
        <AppBar position="fixed" color="white" boxShadow={4}>
            <Toolbar>
                <Box 
                    flexGrow={1}>
                    <IconButton edge="start" marginLeft="auto">
                        <BackButton
                            onClick={homepage}>
                        </BackButton>    
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
        <Toolbar/>
        <br/>
        <div className="rectangle"></div>
        <div className="profilePicContainer">
            
            <div className="pic">
                {/* //Insert Image profile pic here// */}
                <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                <path d="M0 150C0 67.1573 67.1573 0 150 0C232.843 0 300 67.1573 300 150C300 232.843 232.843 300 150 300C67.1573 300 0 232.843 0 150Z" fill="url(#paint0_linear)"/>
                <path d="M95 209.784C113.333 223.117 131.667 233.784 150 233.784C168.333 233.784 186.667 223.117 205 209.784C189.889 205.184 182.222 198.317 182 189.184C182 187.556 182.012 185.244 182.023 180.903C182.023 180.214 182.025 179.508 182.028 178.785C182.058 167.145 182.107 151.785 182.176 136.185C196.508 117.608 191.243 95.829 186.752 96.372C181.246 97.042 133.543 51.774 124.393 49.453C115.243 47.132 92 54.625 88 75.5C84 96.375 82.328 148.993 97.5 170C101.817 175.978 108.617 178.316 117.9 177.015C117.913 181.384 117.939 183.836 118 188.784C117.881 198.333 110.215 205.189 95 209.784Z" fill="url(#paint1_linear)"/>
                <path d="M118 177C140 174.5 154 165 154 165C154 165 138 185 118 189V177Z" fill="#FC9F6A"/>
                <path d="M189.5 136.5C196.39 119.93 224 86.183 200.2 65.183C192.2 26.183 148 30.5 118.5 39.5C98.6731 45.549 83.7001 57.5 80.5001 48.5C60.5001 65.183 70.5161 81.5 83.7001 86.183C95.6661 90.433 115.9 94.683 150.306 90.683C156.452 89.968 155.165 108.791 158.449 110.826C163.376 113.879 167.2 94.683 180.708 100.447C194.216 106.211 186.2 132.937 171.7 132.937C166.7 132.937 164.2 146.684 177.7 153.184C187.5 158 185.023 147.267 189.5 136.5Z" fill="url(#paint2_linear)"/>
                <path d="M255 240.308C264.52 259.665 270 304.308 270 304.308H30C30 304.308 35.482 259.66 45 240.308C54.518 220.956 110.1 203.007 110.1 203.007C140.813 215 159.608 215 189.871 203C189.871 203 245.48 220.951 255 240.308Z" fill="url(#paint3_linear)"/>
                <path d="M157 210L162 302H138L143 210C143 210 147.667 205 150 205C152.333 205 157 210 157 210Z" fill="url(#paint4_linear)"/>
                <path d="M158.139 228.692L142.414 219.606L143 210C146.111 206.667 148.445 205 150 205C151.555 205 153.889 206.667 157 210L158.14 228.692H158.139Z" fill="#645050"/>
                <path d="M150 204.992L140 223L109 204L118 191L150 202.821L182 191L191 204L160 223L150 204.992Z" fill="white"/>
                </g>
                <defs>
                <linearGradient id="paint0_linear" x1="150" y1="0" x2="150" y2="300" gradientUnits="userSpaceOnUse">
                <stop stop-color="#806A6A"/>
                <stop offset="1" stop-color="#665654"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="145.122" y1="49.0471" x2="145.122" y2="233.784" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F7B186"/>
                <stop offset="1" stop-color="#FFC299"/>
                </linearGradient>
                <linearGradient id="paint2_linear" x1="139.44" y1="33.3879" x2="139.44" y2="154.368" gradientUnits="userSpaceOnUse">
                <stop stop-color="#1D0024"/>
                <stop offset="1" stop-color="#100014"/>
                </linearGradient>
                <linearGradient id="paint3_linear" x1="150" y1="203" x2="150" y2="304.308" gradientUnits="userSpaceOnUse">
                <stop stop-color="#1D0024"/>
                <stop offset="1" stop-color="#100014"/>
                </linearGradient>
                <linearGradient id="paint4_linear" x1="150" y1="205" x2="150" y2="302" gradientUnits="userSpaceOnUse">
                <stop stop-color="#806A6A"/>
                <stop offset="1" stop-color="#665654"/>
                </linearGradient>
                <clipPath id="clip0">
                <path d="M0 150C0 67.1573 67.1573 0 150 0C232.843 0 300 67.1573 300 150C300 232.843 232.843 300 150 300C67.1573 300 0 232.843 0 150Z" fill="white"/>
                </clipPath>
                </defs>
                </svg>

            </div>
        </div>
        <div className="leftContainer">
            <Grid container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item spacing={4}>
                
                <InputLabel>Progress</InputLabel>
                <br/>
                <Select
                    native
                    defaultValue={customer && customer.progress}
                    onChange={event => changeProgress(event.target.value)}
                    input={
                    <OutlinedInput
                        name="progress"
                        labelWidth={0}
                        id="outlined-age-native-simple"
                    />
                    }
                >
                    <option value="New">New</option>
                    <option value="Invited">Invited</option>
                    <option value="Met">Met</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Conclude">Conclude</option>
                </Select>
                <br/>
                <br/>
            </Grid>

            <Grid item spacing={4}>
                <InputLabel>Priority</InputLabel>
                <br/>
                <Select
                    native
                    defaultValue={customer && customer.priority}
                    onChange={event => changePriority(event.target.value)}
                    input={
                        <OutlinedInput
                            name="age"
                            labelWidth= "haha"
                            id="outlined-age-native-simple"
                        />
                    }
                    >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </Select>
                <br/>
                <br/>
            </Grid>

                <Grid item spacing={4}>
                    <Box 
                        boxShadow={4}
                        borderRadius={5}
                        style={{ padding: "15px", margin: "8px" }}>
                        {customer &&
                        <>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                            ampm={true}
                            label="Last Contact"
                            inputVariant="outlined"
                            defaultValue={lastContact}
                            onChange={event => changeLastContact(event)}
                            format="dd/MM/yyyy hh:mm a"
                            />
                        </MuiPickersUtilsProvider>
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
                            <centre><h3>NEXT MEETING</h3></centre>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <p><b>Date: </b> <span className="contactInfo">{customer.meeting && customer.meeting.date}</span></p>
                            <Popup trigger={<IconButton><Pen/></IconButton>} position="bottom center">
                                <div>
                                    <Calendar
                                        onChange={(value) => setDate(value)}
                                    />
                                </div>
                            </Popup>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <p><b>Time:</b> {customer.meeting && customer.meeting.time}</p>
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
                            <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                <div>
                                    <p>Edit Description</p>
                                <TextField
                                    id="newnotes"
                                    label="New Description"
                                    placeholder="Write new description here"
                                    multiline
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth 
                                    onChange={e => setDescription(e.target.value)}
                                    />
                                    
                                    <p>Edit Timeline</p>
                                     <TextField
                                    id="newnotes"
                                    label="New Timeline"
                                    placeholder="Write new timeline here"
                                    multiline
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth 
                                    onChange={e => setTimeline(e.target.value)}
                                    />
                                </div>

                            </Popup>
                        </Box>
                    <p><b>High level description: </b> <span className="contactInfo">{customer && customer.description}</span></p>
                    <p><b>Timeline: </b> <span className="contactInfo">{customer && customer.timeline}</span></p>
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
                            <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                <div>
                                <TextField
                                    id="newnotes"
                                    label="Editing notes"
                                    placeholder="Write new notes here"
                                    multiline
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth 
                                    onChange={e => setNotes(e.target.value)}
                                    />
                                </div>

                            </Popup>
                        </Box>
                    <section class="notes">
                        <TextField
                        id="notes"
                        // label="Editing notes"
                        placeholder="Write notes here"
                        multiline
                        variant="outlined"
                        color="secondary"
                        fullWidth 
                        value={customer && customer.notes}
                        />
                    </section>
                    </Box>
                </Grid>    
            </Grid>
        </div>
        </>
    )    
}