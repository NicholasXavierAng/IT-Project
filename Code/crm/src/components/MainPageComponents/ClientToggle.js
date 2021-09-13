//////////////////////////////
// Author(s): Zakarya Butt, Terry 
// Date Made: 08/09/2021
//////////////////////////////

import React, {Component} from 'react'; 
import axios from 'axios';
// import { MyContext } from './Provider';

export default class ClientToggle extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            data:[] 
        }
    }

    async getCustomers() {
        // Sends a request to the backend to get all customers
        axios.get('http://localhost:5000/user/customers').then(res => {
            var data = res.data.customers; 
            this.setState({data:data})
        })
    }

    componentDidMount() {
        this.getCustomers(); 
    }
    

    takeToProfile(id) {
         
        var pathname = "/user/profile/" + id; 
        console.log(pathname);
        
    }

    render() {
        return (
            <div className = "lowerpart">
                {/* <MyContext>
                    {(context) => {
                        if (context) {
                            <p>true</p>
                        }
                        else {
                            <p>false</p>
                        }
                    }} */}
                    <div className = "sidebar"/>
                    <div className = "clients" >
                        {this.state.data.map(d => (
                            <>
                                {/* A loop to handle customers directly from the database  */}
                                <button className = "client" onClick={()=> window.location.href='/user/profile/' + d._id}>
                                <p className = "name">{d.firstName} {d.familyName}</p>
                                <p className = "status">{d.status}</p>
                                <p className = "progress">{d.progress}</p>
                                </button>
                                <svg width="1104" height="4" viewBox="0 0 1104 4" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M0 2L1104 2.35158" stroke="#C4C4C4" stroke-opacity="0.5" stroke-width="2.08177"/>
                                </svg>
                            </>
                        ))}  
                    </div>
                {/* </MyContext> */}
            </div>
        )
    }
}