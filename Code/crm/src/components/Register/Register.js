//////////////////////////////
// Author(s): Nicholas
// Date Made: 10/09/2021
//////////////////////////////
import React, { useState } from 'react';
import './Register.css'; 
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

export default function Register() {
    const [familyname, setFamilyName] = useState();
    const [firstname, setFirstName] = useState();
    const [email, setEmail] = useState();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    let history = useHistory(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = {familyname, firstname, email, username, password};

        // Fetch sends credentials which is username and password 
        // to the back end which validates against the db and then 
        // returns a response. 
        var res = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }); 

        // Response we get from db
        res = await res.json(); 
        
        if (res.status) {
            // Successful registration
            // Redirect to the user home page. 
            history.push('/');
        }
        else {
            // Send error to user to try again. 
        }
    }
    
    return(
        <section class="login-wrapper">
            <img src="/logo.png" alt="logo" width="207" height="55"/>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
            <section class="credentials">
                <TextField
                    required
                    id="firstname"
                    label="First name"
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setFirstName(e.target.value)}
                />
                <br></br>
                <br></br>
                <TextField
                    required
                    id="familyname"
                    label="Family name"
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setFamilyName(e.target.value)}
                />
                <br></br>
                <br></br>
                
                <TextField
                    required
                    id="email"
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setEmail(e.target.value)}
                />
                <br></br>
                <br></br>
                <TextField
                    required
                    id="username"
                    label="Username"
                    variant="outlined"
                    colour="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setUserName(e.target.value)}
                />
                <br></br>
                <br></br>
                <TextField
                    required
                    id="password"
                    label="Password"
                    placeholder="At least 8 symbols..."
                    variant="outlined"
                    color="secondary"
                    height="56px"
                    width="232px"
                    onChange={e => setPassword(e.target.value)}
                />
            </section>
            <br></br>
            <section class="register">
                <button type="register">Register</button>
            </section>
            </form>
        </section>
        )
}