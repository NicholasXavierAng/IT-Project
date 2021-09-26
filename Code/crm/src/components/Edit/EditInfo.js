//////////////////////////////
// Author(s): Nicholas
// Date Made: 26/09/2021
//////////////////////////////
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EditInfo.css'; 
import Auth from '../Authentication/Auth';
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const API_URL = "http://localhost:5000/";

export default function EditInfo() {
    return (
        <h1>EDIT</h1>
    )
}