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

export default function Profile({props}) {

    var [customer, setCustomer] = useState(); 
    var [company, setCompany] = useState(); 
    let {id} = useParams();
    
    // Called as soon as the page is loaded.
    useEffect(() => {
        getCustomer();  
    })

     
    // Gets data for the specefic customer from the db. 
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
        setCustomer(cust); 
        setCompany(comp); 
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
        <div className="rightContainer">
            <Grid container
                direction="row"
                justifyContent="space-between"
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
                        style={{ padding: "15px", margin: "5px" }}>
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
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item spacing={5}>
                    <Box 
                        boxShadow={4}
                        borderRadius={5}
                        style={{ padding: "15px", margin: "5px" }}>
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
                        style={{ padding: "15px", margin: "5px" }}>
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
                        style={{ padding: "15px", margin: "5px" }}>
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
                        height="100px"
                        width="860px"
                        />
                    </section>
                    </Box>
                </Grid>    
            </Grid>
        </div>
        </>
    )    
}