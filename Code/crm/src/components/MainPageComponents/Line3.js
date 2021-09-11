import React from 'react'
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
                <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 14H7V11.6667H0V14ZM0 0V2.33333H21V0H0ZM0 8.16667H14V5.83333H0V8.16667Z" fill="black"/>
                </svg>
            </div>
    
        </div>
    )
}

export default Addcontact
/* Vector */

