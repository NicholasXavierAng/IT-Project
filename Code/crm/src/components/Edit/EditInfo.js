//////////////////////////////
// Author(s): Nicholas
// Date Made: 26/09/2021
//////////////////////////////
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EditInfo.css'; 
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useToken from '../App/useToken';

const jwt = require('jsonwebtoken');
const config = require('../Configuration/config.json');
const API_URL =  config.API_URL; 

async function editInformation(information, type) {
    return fetch(API_URL + "edit_" + type + "/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(information)
    })
    .then(data => data.json())
}

export default function EditInfo() {
    const cancel = async (e) => {
        e.preventDefault();
        window.location.href = '/';
    }
    const [username, setUserName] = useState();
    const [firstName, setFirstName] = useState();
    const [familyName, setFamilyName] = useState();
    const [email, setEmail] = useState();
    const [oldPw, setOldPw] = useState();
    const [newPw, setNewPw] = useState();
    const [confirmPw, setConfirmPw] = useState();

    var { token, getToken } = useToken();
    var decode = jwt.decode(token);
    
    const editUsername = async (e) => {
        e.preventDefault();
        const res = await editInformation({
            username,
        }, "username")
    }

    const editFirstName = async (e) => {
        e.preventDefault();
        const res = await editInformation({
            firstName,
        }, "firstname")
    }

    const editFamilyName = async (e) => {
        e.preventDefault();
        const res = await editInformation({
            familyName,
        }, "familyname")
    }

    const editEmail = async (e) => {
        e.preventDefault();
        const res = await editInformation({
            email,
        }, "email")
    }

    const editPassword = async (e) => {
        e.preventDefault();
        const res = await editInformation({
            oldPw,
            newPw,
            confirmPw
        }, "password")
    }

    return(
        <section className="editInfo-wrapper">
            <br/>
            <br/>
            <br/>
            <br/>
            <label>Edit Information</label>
            <Button
                type="save"
                variant="contained"
                color="secondary"
                style={{minWidth: "85px", minHeight:"35px"}}
                onClick={cancel}>
                Cancel
            </Button>
            <form onSubmit={editUsername}>
            <br/>
            <br/>
            <label>Edit Username</label>
            <br/>
            <br/>
            <section className="username">
                <TextField
                    required
                    id="username"
                    label={decode.username}
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setUserName(e.target.value)}
                />
                <Button
                    type="save"
                    variant="contained"
                    color="secondary"
                    style={{minWidth: "85px", minHeight:"35px"}}>
                    Save changes
                </Button>
                <br/>
                <br/>
            </section> 
            </form>
            
            <form onSubmit={editFirstName}>
            <label>Edit Family Name</label>
            <br/>
            <br/>
            <section className="firstname">
                <TextField
                    required
                    id="firstName"
                    label={decode.firstName}
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setFirstName(e.target.value)}
                />
                <Button
                    type="save"
                    variant="contained"
                    color="secondary"
                    style={{minWidth: "85px", minHeight:"35px"}}>
                    Save changes
                </Button>
                <br/>
                <br/>
            </section> 
            </form>

            <form onSubmit={editFamilyName}>
            <label>Edit Family Name</label>
            <br/>
            <br/>
            <section className="familyname">
                <TextField
                    required
                    id="familyName"
                    label={decode.familyName}
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setFamilyName(e.target.value)}
                />
                <Button
                    type="save"
                    variant="contained"
                    color="secondary"
                    style={{minWidth: "85px", minHeight:"35px"}}>
                    Save changes
                </Button>
                <br/>
                <br/>
            </section> 
            </form>

            <form onSubmit={editEmail}>
            <label>Edit Email</label>
            <br/>
            <br/>
            <section className="email">
                <TextField
                    required
                    id="email"
                    label={decode.email}
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setEmail(e.target.value)}
                />
                <Button
                    type="save"
                    variant="contained"
                    color="secondary"
                    style={{minWidth: "85px", minHeight:"35px"}}>
                    Save changes
                </Button>
                <br/>
                <br/>
            </section> 
            </form>
            
            <form onSubmit={editPassword}>
            <label>Edit Password</label>
            <br/>
            <br/>
            <section className="password">
                <TextField
                    required
                    id="oldpw"
                    label="Old Password"
                    type="oldPw"
                    placeholder="At least 8 characters..."
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setOldPw(e.target.value)}
                />
                <br/>
                <br/>
                <TextField
                    required
                    id="newpw"
                    label="New Password"
                    type="newPw"
                    placeholder="At least 8 characters..."
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setNewPw(e.target.value)}
                />
                <br/>
                <br/>
                <TextField
                    required
                    id="confirmPw"
                    label="Confirm New Password"
                    type="confirmPw"
                    placeholder="At least 8 characters..."
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setConfirmPw(e.target.value)}
                />
                <Button
                    type="save"
                    variant="contained"
                    color="secondary"
                    style={{minWidth: "85px", minHeight:"35px"}}>
                    Save changes
                </Button>
                <br/>
                <br/>
            </section> 
            </form>       
            
        </section>
        )
}

EditInfo.propTypes = {
    setToken: PropTypes.func.isRequired
};