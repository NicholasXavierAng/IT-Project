//////////////////////////////
// Author(s): Zakarya Butt, Nicholas, Rebecca
// Date Made: 07/09/2021
//////////////////////////////
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css'; 
// import {Redirect} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

// Removed by Zakarya, the response we get from server side is important 
// And I wasnt able to access it through this function, so I just made it 
// into one big function. If you know how to do it separatley do let me know. 
// async function loginUser(credentials) {
//     return fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
  
//         .then(data => data.json())
        
//     }

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    let history = useHistory(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = {username, password};

        // Fetch sends credentials which is username and password 
        // to the back end which validates against the db and then 
        // returns a response. 
        var res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }); 

        // Response we get from db
        res = await res.json(); 
        
        if (res.status) {
            // Successful login
            // Redirect to the user home page. 
            history.push('/user');
        }
        else {
            // Send error to user to try again. 
        }


        // const token = await loginUser({
        //     username,
        //     password
        // });
        
        // console.log("token");
        // console.log(token);
        // setToken(token);
    }

    return(
        <section class="login-wrapper">
            <img src="/logo.png" alt="logo" width="207" height="55"/>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
            <section class="credentials">
                <label for="username">
                    <p>Username</p>
                </label>
                <input type="text" placeholder="Enter username" onChange={e => setUserName(e.target.value)} required/>
                <label for="password">
                    <p>Password</p>
                </label>
                <input type="password" placeholder="At least 8 characters..." minlength="8" onChange={e => setPassword(e.target.value)} required/>
            </section>
            <br></br>

            <section class="newCredentials">
            <TextField
            required
            id="username"
            label="Username"
            variant="outlined"
            color="secondary"
            height="56px"
            width="232px"
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
            />
            </section>
            <br></br>
            <section class="submission">
                <button type="submit">Log in</button>
            </section>
            </form>
        </section>
        )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};