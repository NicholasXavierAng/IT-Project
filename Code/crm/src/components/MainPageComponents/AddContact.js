//////////////////////////////
// Author(s): Zakarya Butt
// Date Made: 26/09/2021
//////////////////////////////

import Topbar from '../MainPageComponents/Topbar';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import './AddContact.css'; 
import Button from '@material-ui/core/Button';

export default function EditInfo() {
    return (
        <>
            <Topbar />
            <h1 className="clientHeading">Create Client</h1>
            <section className="boxes">
                <Box
                borderRadius={16}
                width={300}
                height={600}
                boxShadow={0}
                paddingLeft={5}
                paddingRight={5}
                
                >
                    <br/>
                    <h4>Client Information</h4>
                    <section className="">
                        <TextField
                            required
                            id="firstname"
                            label="First Name"
                            placeholder="e.g. John"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="familyName"
                            label="Family Name"
                            // type="password"
                            placeholder="e.g. Doe"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="dob"
                            label="Date of Birth"
                            placeholder="At least 8 symbols..."
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="gender"
                            label="Gender"
                            placeholder="Type here..."
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="number"
                            label="Phone Number"
                            placeholder="+7 (· · · ) · · · · · · ·"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            placeholder="e.g. john@gmail.com"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                    </section> 
    
                </Box>

                <Box
                borderRadius={16}
                width={300}
                height={600}
                boxShadow={0}
                paddingLeft={5}
                paddingRight={5}
                
                >
                    <br/>
                    <h4>Company Information</h4>
                    <section className="">
                        <TextField
                            required
                            id="companyName"
                            label="Company Name"
                            placeholder="e.g. Google"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="companyLocation"
                            label="Company Location"
                            // type="password"
                            placeholder="e.g. Melbourne, Australia"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="position"
                            label="Position at Company"
                            placeholder="e.g. CEO"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="department"
                            label="Department at Company"
                            placeholder="e.g. Technology"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="priority"
                            label="Priority"
                            placeholder="High, Medium or Low"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="status"
                            label="Status"
                            placeholder="e.g. New"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => console.log(e.target.value)}
                        />
                    </section> 
    
                </Box>

                
            </section>
            <section className="add-contact">
                <Button
                    className 
                    type="submit"
                    variant="contained"
                    color="secondary"
                    style={{minWidth: "85px", minHeight:"35px"}}>
                    Add Contact
                </Button>
            </section>
        </>
    )
}