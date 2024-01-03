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

export default function PatientPage() {
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

    // console.log(location.state);

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

    //--------------------Table--------------------

    const columns = [
        { id: 'name', label: 'Name', align: 'left' },
        { id: 'age', label: 'Age', align: 'left' },
        {
            id: 'aadhar',
            label: 'Aadhar No.',
            align: 'center',
        },
        {
            id: 'phone',
            label: 'Phone No.',
            align: 'center',
        },
        {
            id: 'email',
            label: 'Email',
            align: 'center',
        },
    ];

    var [rows, setRows] = useState([]);
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
                setRows(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

    }, []);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchBy, setSearchBy] = React.useState('name');
    const [search, setSearch] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeSearchBy = (event) => {
        setSearchBy(event.target.value);
        // console.log(event.target.value);
        // console.log(searchBy);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeSearch = (event) => {
        setSearch(event.target.value);

        if (searchBy === 'name') {
            console.log("searching by name");
            const filteredRows = allRows.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()));
            setRows(filteredRows);
        } else {
            console.log("searching by aadhar");
            const filteredRows = allRows.filter(row => row.aadhar.toLowerCase().includes(event.target.value.toLowerCase()));
            setRows(filteredRows);
        }
    }

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
                <Typography variant="h4" align="center" gutterBottom position='absolute' marginLeft='1000px' marginTop='176px'>
                    <FormControl fullWidth>
                        <InputLabel color='success' variant="standard" htmlFor="uncontrolled-native">
                            Search by
                        </InputLabel>
                        <NativeSelect
                            color='success'
                            defaultValue='name'
                            inputProps={{
                                name: 'searchBy',
                                id: 'uncontrolled-native',
                            }}
                            onChange={handleChangeSearchBy}
                        >
                            <option value='name'>Name</option>
                            <option value='aadhar'>Aadhar</option>
                        </NativeSelect>
                    </FormControl>
                </Typography>
                <Typography variant="h4" align="center" gutterBottom position='absolute' marginLeft='70px' marginTop='100px'>Patient List</Typography>
                <Typography variant="h4" align="center" gutterBottom position='absolute' marginLeft='820px' marginTop='180px'>
                    <Input
                        color='success'
                        sx={{ width: '170px', color: 'black' }}
                        label="outlined"
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'black' }} />
                            </InputAdornment>
                        }
                        onChange={handleChangeSearch}
                    />
                </Typography>
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


            {/* --------------------Table-------------------- */}
            <Divider sx={{ position: 'relative', marginTop: '15px', backgroundColor: 'grey' }} variant="middle" />
            <Divider sx={{ position: 'relative', marginTop: '6px', backgroundColor: 'grey' }} variant="middle" />
            {rows == null && <h1>loading</h1>}
            {rows != null && <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2, paddingBottom: 10, paddingLeft: 4, paddingRight: 4, marginTop: '60px' }}>
                <Paper elevation={10} sx={{ width: '95%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440, marginLeft: 5 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: '1.1rem' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.length != 0 ? (rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    }))
                                    :
                                    <TableRow>
                                        {columns.map((column) => {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Skeleton variant="rectangular" sx={{ margin: '10px', borderRadius: '10px' }} height={50} />
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>}
        </>
    );
}
