import React from 'react';
import './Components.css';
import Box from '@material-ui/core/Box';
import NotificationsIcon from '@material-ui/icons/Notifications'; 
import { IconButton, AppBar, Toolbar } from '@material-ui/core';


const Topbar = () => {
    return (
        <section className = 'topbar' >
            <AppBar position="fixed" color="white" boxShadow={4}>
                <Toolbar>
                    <Box 
                        flexGrow={1}>
                    </Box>
                    <Box flexGrow={1}>
                        <img class="header" src="/logo.png" alt="logo" width="207" height="55" />
                    </Box>
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </section>
  )
}


export default Topbar
