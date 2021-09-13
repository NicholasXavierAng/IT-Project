//////////////////////////////
// Author(s): Zakarya Butt 
// Date Made: 13/09/2021
//////////////////////////////

import React from 'react'; 
import { Route, Redirect } from "react-router-dom";
import auth from './auth';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render= {
            (props) => {
                if (auth.isAuthenticated()) { 
                    console.log("Pp"); 
                    return <Component  {...props}/>
                }
                else {
                    console.log("NOT"); 
                    return <Redirect to={{
                            pathname:"/"
                        }
                    } />
                }
            }
        }/>
    )
}