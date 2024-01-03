import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

//Material UI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import Navbar2 from './Navbar2';
const AddPatient = () => {

    const location = useLocation();
    const nav = useNavigate();
    const [flag, setFlag] = useState(0);

    console.log(location.state);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the form data
        const name = event.target.elements.name.value;
        const age = event.target.elements.age.value;
        const aadhar = event.target.elements.aadhar.value;
        const phone = event.target.elements.phone.value;
        const email = event.target.elements.email.value;

        // Create the data object to send to the API
        const data = {
            name,
            age,
            aadhar,
            phone,
            email
        };

        console.log(data);

        if (!data.name || !data.aadhar) {
            setFlag(3);
        }
        else {
            setFlag(0);
            try {
                // Send the data to the API using fetch or axios
                const response = await fetch('https://birac-jan-care.onrender.com/task/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                // Handle the API response
                console.log("success");
                setFlag(1);
                console.log(result);

                setTimeout(() => {
                    nav('/dashboard', { state: location.state });
                }, 3000);
            } catch (error) {
                // Handle any errors
                console.log("error");
                setFlag(2);
                console.error(error);

                setTimeout(() => {
                    // nav('/addPatient', { state: location.state });
                    window.location.reload();
                }, 3000);
            }
        }

    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                <Navbar2 />
                <h1>Register a Patient</h1>
                <div>
                    <h1>Register a Patient</h1>
                    <form onSubmit={handleSubmit}>
                        <Box
                            component="div"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                                backgroundColor: 'white',
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" name="name" label="Name" variant="outlined" />
                            <TextField id="outlined-basic" name="age" label="Age" variant="outlined" type="number" />
                            <br />
                            <TextField id="outlined-basic" name="aadhar" label="Aadhar" variant="outlined" type='number' />
                            <TextField id="outlined-basic" name="phone" label="Phone" variant="outlined" type="number" />
                            <br />
                            <TextField id="outlined-basic" name="email" label="email" variant="outlined" type='email' />
                            <br />
                            <Button type="submit" variant="contained">Submit</Button>
                        </Box>
                    </form>
                </div>
                <div >
                    <br />
                    {flag == 3 && <div>
                        <Alert variant="filled" severity="warning">
                            Please fill name and aadhar!!!
                        </Alert>
                    </div>}
                    {flag == 1 && <div>
                        <Alert variant="filled" severity="success">
                            Patient Registered Successfully!
                        </Alert>
                    </div>}
                    {flag == 2 && <div>
                        <Alert variant="filled" severity="error">
                            Patient Registration Failed! Please try again.
                        </Alert>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default AddPatient;

