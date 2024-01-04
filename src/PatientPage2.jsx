import * as React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useEffect, useState } from 'react';
import { Box, InputAdornment, Typography } from '@mui/material';

//Material UI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Navbar2 from './Navbar2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import NativeSelect from '@mui/material/NativeSelect';
import DialogContentText from '@mui/material/DialogContentText';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import TableRender from './TableRender';

export default function PatientPage2() {
    //------------------Alerts------------------
    const [openFill, setOpenFill] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openUnsuccess, setOpenUnsuccess] = React.useState(false);
    const [openLoader, setOpenLoader] = React.useState(false);

    const handleCloseLoader = () => {
        setOpenLoader(true);
    };

    const handleCloseFill = () => {
        setOpenFill(false);
    };
    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };
    const handleCloseUnsuccess = () => {
        setOpenUnsuccess(false);
    };


    //------------------Add Button------------------
    const [open, setOpen] = React.useState(false);
    const location = useLocation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleSubmit() {
        console.log("Submitted");

        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const aadhar = document.getElementById("aadhar").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const data = {
            name,
            age,
            aadhar,
            phone,
            email
        };

        if (!data.name || !data.aadhar) {
            console.log("Fill all the fields");
            setOpenFill(true);
        } else {
            setOpen(false);
            setOpenLoader(true);
            try {
                const response = await axios.post('https://birac-jan-care.onrender.com/task/add', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': location.state?.token
                        // Add any other headers you need
                    }
                });
                console.log(response);
                setOpenLoader(false);
                setOpenSuccess(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } catch (error) {
                console.error(error);
                setOpenLoader(false);
                setOpenUnsuccess(true);
            }
        }
    };

    const [allRows, setAllRows] = useState([]);

    useEffect(() => {
        // console.log("fetching");
        const fetchData = async () => {
            try {
                const response = await axios.get('https://birac-jan-care.onrender.com/task/getAllPatients', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': location.state?.token
                        // Add any other headers you need
                    }
                });
                setAllRows(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

    }, []);

    return (
        <>
            {/* //-------------------Alerts------------------------- */}

            {/* Loader */}

            <React.Fragment>
                <Dialog
                    open={openLoader}
                    onClose={handleCloseLoader}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{ textAlign: 'center' }}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <CircularProgress color="inherit" />
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </React.Fragment>

            {/* Fill all fields */}
            <React.Fragment>
                <Dialog
                    open={openFill}
                    onClose={handleCloseFill}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <div style={{ textAlign: 'center' }}>
                            <ErrorOutlineIcon sx={{ color: 'black' }} />
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please fill Name and Aadhar Number to continue.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseFill} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            {/* Successful */}
            <React.Fragment>
                <Dialog
                    open={openSuccess}
                    onClose={handleCloseSuccess}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <div style={{ textAlign: 'center' }}>
                            <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Patient Registered Successfully.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSuccess} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            {/* Unsuccessful */}
            <React.Fragment>
                <Dialog
                    open={openUnsuccess}
                    onClose={handleCloseUnsuccess}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <div style={{ textAlign: 'center' }}>
                            <ErrorOutlineIcon sx={{ color: 'red' }} />
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Patient Registration Failed! Please try again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseUnsuccess} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            {/* //--------------------Add Patient-------------------- */}

            <React.Fragment>
                <Navbar2 />
                <Typography variant="h4" align="center" gutterBottom position='absolute' marginLeft='70px' marginTop='100px'>Patient List</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '80px' }}>
                    <Button disableRipple sx={{ "&:hover": { backgroundColor: "transparent" } }} onClick={handleClickOpen}>
                        <Fab variant="extended">
                            <AddIcon sx={{ mr: 1 }} />
                            Add Patient
                        </Fab>
                    </Button>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Enter Patient Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            color='success'
                            margin="dense"
                            name="name"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                        />
                        <TextField
                            color='success'
                            margin="dense"
                            name="age"
                            id="age"
                            label="Age"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            color='success'
                            margin="dense"
                            name="aadhar"
                            id="aadhar"
                            label="Aadhar Number"
                            type="number"
                            fullWidth
                            variant="standard"
                            required
                        />
                        <TextField
                            color='success'
                            margin="dense"
                            name="phone"
                            id="phone"
                            label="Phone Number"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            color='success'
                            margin="dense"
                            name="email"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color='success' onClick={handleClose}>Cancel</Button>
                        <Button color='success' onClick={handleSubmit}>Sumbit</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            {allRows && <TableRender rows={allRows} />}
        </>
    );
}
