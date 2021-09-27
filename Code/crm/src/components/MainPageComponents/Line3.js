import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import Sort from '@material-ui/icons/Sort';



const Addcontact = () => {
    
    return (
        <div className ='line3'>
            <section class="createContact">
                <Button
                href="/addContact"
                variant="contained"
                color="secondary"
                style={{minWidth: "254px", minHeight:"56px"}}>
                    +  CREATE CONTACT
                </Button>
            </section>
            <div className="titles">
                <p className="p">Name</p> 
                <p className="p">Progress</p>  
                <p className="p">Priority</p>
                <IconButton>
		            <Sort />
	            </IconButton>
            </div>
            
    
        </div>
        
    )
}

export default Addcontact
/* Vector */

