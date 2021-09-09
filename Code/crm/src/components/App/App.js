//////////////////////////////
// Author(s): Nicholas, Zakarya Butt 
// Date Made: 08/09/2021
//////////////////////////////

import React, { useState } from 'react';
import {BrowserRouter as Router, BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import UserHome from '../User/UserHome';
// import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
// import Preferences from '../Preferences/Preferences';
import useToken from './useToken';

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
                        <Route path="/user">
                            <UserHome/>
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
              
            {/* <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/preferences">
                <Preferences />
            </Route> */}
            </Switch>
        </BrowserRouter>
        </div>
    );
}

export default App;