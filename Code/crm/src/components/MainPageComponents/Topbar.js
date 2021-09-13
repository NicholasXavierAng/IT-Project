import React from 'react';
import './Components.css';
import Box from '@material-ui/core/Box';
import NotificationsIcon from '@material-ui/icons/Notifications'; 
import { IconButton } from '@material-ui/core';


const Topbar = () => {
  return (
    <section className = 'topbar' >
           <Box
                borderRadius={16}
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height={56}
                boxShadow={4}>
                    <img class="header" src="/logo.png" alt="logo" width="207" height="55"/>
                    <IconButton>
                        <NotificationsIcon/>
                    </IconButton>
            </Box> 
        
    </section>
  )
}


export default Topbar
