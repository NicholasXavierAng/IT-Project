import React, { useState } from 'react';
import Button from '@material-ui/core/Button';



const Addcontact = () => {
    
    return (
        <div className ='line3'>
            <section class="createContact">
                <Button
                variant="contained"
                color="secondary"
                style={{minWidth: "254px", minHeight:"56px"}}>
                    +  CREATE CONTACT
                </Button>
            </section>
            <div className="titles">
                <p className="p">Name</p> 
                <p className="p">Status</p>  
                <p className="p">Progress</p>
                
            </div>
            
    
        </div>
        
    )
}

export default Addcontact
/* Vector */

