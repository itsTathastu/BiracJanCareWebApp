import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import theme from './theme';

//Material UI imports
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const defaultTheme = createTheme();

function Login() {

    const nav = useNavigate();

    const [openLoader, setOpenLoader] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openUnsuccess, setOpenUnsuccess] = React.useState(false);

    const handleCloseLoader = () => {
        setOpenLoader(false);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseUnsuccess = () => {
        setOpenSuccess(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setOpenLoader(true);
        const data = new FormData(event.currentTarget);

        const response = await fetch('https://biracjancare-home-server.onrender.com/hospital/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
            })
        });

        const content = await response.json();

        if (content.success) {
            setOpenLoader(false);
            setOpenSuccess(true);
            // console.log(content);
            // console.log("Login successful");
            let hospital = content.hospital;
            hospital.isLoggedIn = true;
            console.log(hospital);
            setTimeout((3000));
            nav('/home', { state: content });

        } else {
            setOpenLoader(false);
            setOpenUnsuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            console.log("Login failed");
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/biracjancare2.appspot.com/o/backgroung%20img%2Fv870-tang-36.jpg?alt=media&token=93e7d8c1-29e4-4c87-b45b-b4285f4f8760)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'left',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    color="success"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    color="success"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    color='success'
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>

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
                            Login Successful!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleCloseSuccess} autoFocus>
                            Close
                        </Button> */}
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
                            Login Unsuccessful! Bad Credentials!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleCloseUnsuccess} autoFocus>
                            Close
                        </Button> */}
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    );
}

export default Login;