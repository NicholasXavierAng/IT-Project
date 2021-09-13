//////////////////////////////
// Author(s): Zakarya Butt, Rebecca Ye, Tiana Litchfield
// Date Made: 12/09/2021
//////////////////////////////

import './Profile.css'; 
import TextField from '@material-ui/core/TextField';
import BackButton from '@material-ui/icons/ArrowBack'; 
import Bell from '@material-ui/icons/Notifications'; 
import Pen from '@material-ui/icons/Create'; 
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Profile({props}) {

    var [customer, setCustomer] = useState(); 
    var [company, setCompany] = useState(); 
    let {id} = useParams();
    

    useEffect(() => {
        getCustomer();  
    })

     

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
        <div className="topBar">
            <Box
                borderRadius={16}
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height={56}
                boxShadow={4}>
                    <IconButton>
                        <BackButton/>
                    </IconButton>
                    <img class="header" src="/logo.png" alt="logo" width="207" height="55"/>
                    <IconButton>
                        <Bell/>
                    </IconButton>
            </Box> 
        </div>
        <div className="rectangle"></div>
        {/* <div className="leftContainer">
            <p>aa</p>
        </div> */}
        <div className="rightContainer">
            <div className="row">
                <div className="infoContainer">
                {customer  && 
                    <>
                    <h1>{customer.firstName} {customer.familyName}</h1>
                    <p><b>Age: </b> {customer.age}</p>
                    <p><b>Gender: </b> {customer.gender}</p>
                    </>
                }
                </div>
                <div className="generalBox">
                    <div className="editRow">
                        <h3>Contact</h3>
                        <div className="editBox">
                            <IconButton>
                                <Pen/>
                            </IconButton>
                        </div>
                    </div>
                    {customer &&
                    <>
                    <p><b>Mobile: </b> <span className="contactInfo">{customer.phoneNumber}</span></p>
                    <p><b>Email: </b> <span className="contactInfo">{customer.email}</span></p> 
                    </>
                    }
                </div>
            </div>
            <div className="row">
                <div className="generalBox">
                    <div className="editRow">
                        <h3>Company Information</h3>
                        <div className="editBox">
                            <IconButton>
                                <Pen/>
                            </IconButton>
                        </div>
                    </div>

                    {company &&
                    <>
                        <p><b>Name: </b> <span className="contactInfo">{company.name}</span></p>
                        <p><b>Location: </b> <span className="contactInfo">{company.location}</span></p>
                        <p><b>Position: </b> <span className="contactInfo">{company.position}</span></p>
                        <p><b>Department: </b> <span className="contactInfo">{company.department}</span></p>
                    </>
                    }
                </div>
                <div className="generalBox">
                    <div className="editRow">
                        <h3>Contact</h3>
                        <div className="editBox">
                            <IconButton>
                                <Pen/>
                            </IconButton>
                        </div>
                    </div>
                    <p><b>Mobile: </b> <span className="contactInfo">25</span></p>
                    <p><b>Email: </b> <span className="contactInfo">Male</span></p>
                </div>
            </div>
            <div className="generalBox">
                    <div className="editRow">
                        <h3>Notes</h3>
                        <div className="editBox">
                            <IconButton>
                                <Pen/>
                            </IconButton>
                        </div>
                    </div>
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
                </div>
        </div>
        </>
    )
    // }
    
}