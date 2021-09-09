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
                <Router>
                    <Switch>
                        <Route path="/" exact render={(props) => (
                            <>
                                <Login setToken={setToken} />
                            </>
                        )}>
                        </Route>
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