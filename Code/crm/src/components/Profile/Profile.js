//////////////////////////////
// Author(s): Zakarya Butt, Rebecca
// Date Made: 12/09/2021
//////////////////////////////

import './Profile.css'; 
import TextField from '@material-ui/core/TextField';
import BackButton from '@material-ui/icons/ArrowBack'; 
import Bell from '@material-ui/icons/Notifications'; 
import Pen from '@material-ui/icons/Create'; 
import { IconButton } from '@material-ui/core';

export default function Profile() {
    return(
        <>
        <div className="topBar">
            <IconButton>
                <BackButton/>
            </IconButton>
            <img src="/logo.png" alt="logo" width="207" height="55"/>
            <IconButton>
                <Bell/>
            </IconButton>
        </div>
        <div className="rectangle"></div>
        <div className="leftContainer">
            <img src="" className="profilePic"></img>
        </div>
        <div className="rightContainer">
            <div className="row">
                <div className="infoContainer">
                    <h1>John Doe</h1>
                    <p><b>Age: </b> 25</p>
                    <p><b>Gender: </b> Male</p>
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
            <div className="row">
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

            <section class="notes">
                <TextField
                required
                id="notes"
                label="Notes"
                variant="outlined"
                color="secondary"
                height="100px"
                width="860px"
                />
            </section>
        </div>
        </>
    )
}