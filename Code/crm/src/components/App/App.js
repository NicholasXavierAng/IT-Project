//////////////////////////////
// Author(s): Nicholas, Zakarya Butt, Rebecca
// Date Made: 08/09/2021
//////////////////////////////

import React, { useState } from 'react';
import {BrowserRouter as Router, BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import UserHome from '../User/UserHome';
import Login from '../Login/Login';
import Register from '../Register/Register';
import useToken from './useToken';
import Profile from '../Profile/Profile'; 

function App() {
    const { token, setToken } = useToken();

    if(!token) {
        return (
            <>
            {/* This part handles all the different routes that we implement inside our web app */}
                <Router>
                    <Switch>
                        {/* At the home route  */}
                        <Route path="/" exact render={(props) => (
                            <>
                                <Login setToken={setToken} />
                            </>
                        )}>
                        </Route>
                        {/* User Home Page Route  */}
                        <Route path="/user" exact>
                            <UserHome/>
                        </Route>
                        {/* User Profile Route*/}
                        <Route path="/user/profile">
                            <Profile/>
                        </Route>
                        {/* Register page route */}
                        <Route path="/register">
                            <Register/>
                        </Route>
                    </Switch>
                </Router>
            </>
        )
    }

    return (
        <div className="wrapper">
        <h1>Placeholder</h1>
        <div>
            <button type="Sign Out">Sign Out</button>
        </div>
        <BrowserRouter>
            <Switch>
              
            
            </Switch>
        </BrowserRouter>
        </div>
    );
}

export default App;