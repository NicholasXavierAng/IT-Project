//////////////////////////////
// Author(s): Nicholas, Zakarya Butt, Rebecca
// Date Made: 08/09/2021
//////////////////////////////

import React from 'react';
import {BrowserRouter as Router, BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import UserHome from '../User/UserHome';
import Login from '../Login/Login';
import Register from '../Register/Register';
import useToken from './useToken';
import Profile from '../Profile/Profile'; 
import EditInfo from '../Edit/EditInfo';
import AddContact from '../MainPageComponents/AddContact'; 
import P from '../Profile/P';

function App() {
    const { token, setToken } = useToken(); 

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <BrowserRouter>
            <Switch>
                {/* User Home Page Route */}
                <Route exact path="/" component={UserHome}/>
                {/* User Profile Route */}
                <Route exact path="/user/profile/:id" component={Profile}/>
                {/* Edit user information */}
                <Route path="/edit_information" component={EditInfo}/>
                {/* Add Contact Route  */}
                <Route path="/addContact" component={AddContact}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;