import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css'; 
import {Redirect} from 'react-router-dom';

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
    // const history = useHistory(); 

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
        // console.log(res);
        

        if (res.status) {
            // Successful login
            console.log("success");
            // For some reason not redirecting yet. 
            return <Redirect to="/user"/>
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
        <div className="login-wrapper">
            <h1>HOT CHEETOHS</h1>
            <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
        )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};