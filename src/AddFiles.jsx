import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase-config";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

//Material UI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Navbar2 from './Navbar2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


function AddFiles() {

    const nav = useNavigate();
    const location = useLocation();
    const [files, setFiles] = useState(null);
    const [aadhar, setAadhar] = useState(null);
    const [URL, setURL] = useState([]);
    const [openNoFiles, setOpenNoFiles] = useState(false);
    const [openLoader, setOpenLoader] = useState(false);
    const [openSuccessUpload, openSuccesFileUpload] = useState(false);
    const [openUnsuccessfulUpload, setUnsuccessfulUpload] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openUnsuccess, setOpenUnsuccess] = useState(false);

    var hospitalID = null;

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    }

    const handleCloseUnsuccess = () => {
        setOpenUnsuccess(false);
    }

    const handleCloseSuccessUpload = () => {
        openSuccesFileUpload(false);
    }

    const handleCloseUnsuccessfulUpload = () => {
        setUnsuccessfulUpload(false);
    }

    const handleCloseLoader = () => {
        setOpenLoader(false);
    }

    const handleCloseNoFiles = () => {
        setOpenNoFiles(false);
    };

    const DemoPaper = styled(Paper)(({ theme }) => ({
        width: 400,
        height: 400,
        padding: theme.spacing(2),
        ...theme.typography.body2,
        textAlign: 'center',
    }));

    useEffect(() => {
        hospitalID = location.state?.hospital.id;
    });

    const uploadFiles = async () => {


        if (files === null) {
            console.log("No files selected");
            setOpenNoFiles(true);
            return;
        }
        else {
            setOpenLoader(true);
            if (files) {
                console.log("here");
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const fileRef = ref(storage, `files/${file.name}`);

                    try {
                        await uploadBytes(fileRef, file);
                        const downloadURL = await getDownloadURL(fileRef);
                        // console.log("Download URL:", downloadURL);
                        setURL(prevURLs => [...prevURLs, downloadURL]);
                        setOpenLoader(false);
                        openSuccesFileUpload(true);
                    } catch (error) {
                        console.error("Error uploading file:", error);
                        setOpenLoader(false);
                        setUnsuccessfulUpload(true);
                    }
                }
            }
            // console.log("Uploaded");
        }
    }

    function handleAadharChange(event) {
        setAadhar(event.target.value);
    }

    function handleChange(event) {
        setFiles(event.target.files);
    }

    async function handleSubmit(event) {

        event.preventDefault();
        setOpenLoader(true);

        if (URL.length !== 0) {
            const obj = {
                files: URL,
                aadhar: aadhar,
                hospitalId: hospitalID
            };

            try {
                const response = await axios.post('https://birac-jan-care.onrender.com/task/transact', obj, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': location.state?.token
                        // Add any additional headers here
                    }
                });
                console.log("Server response:", response.data);
                setOpenLoader(false);
                setOpenSuccess(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } catch (error) {
                console.error("Error sending data to server:", error);
                setOpenLoader(false);
                setOpenUnsuccess(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }
    }


    return (
        <>
            <Navbar2 />
            <Typography variant="h4" component="div" sx={{ marginLeft: '480px', marginTop: '100px' }}>Upload Files</Typography>
            <DemoPaper square={false} elevation={20} sx={{width: '500px', margin: 'auto', marginTop: '20px',height:'350px' }}>
                <TextField
                    color='success'
                    sx={{ width: '300px'}}
                    id="outlined-basic" 
                    name="aadhar" 
                    label="Enter Aadhar No." 
                    variant="outlined" 
                    onChange={handleAadharChange} 
                    value={aadhar} 
                    autoFocus
                    />
                <br />
                <Divider variant='middle' sx={{ marginTop: '20px', backgroundColor: 'grey' }} />
                <Button
                    variant="contained"
                    component="label"
                    sx={{ marginTop: '20px', marginLeft: '-100px', borderRadius: '200px', width: '10px', backgroundColor: '#008F91', '&:hover': { backgroundColor: '#00B7AF' } }}
                >
                    <AddIcon />
                    <input
                        type="file"
                        multiple
                        hidden
                        onChange={handleChange}
                    />
                </Button>
                <Typography variant="p" component="div" sx={{ display: 'relative', marginTop: '-25px', marginLeft: '100px' }}>{files ? files.length : 0} Files chosen...</Typography>
                <br />
                <Button
                    variant="contained"
                    component="label"
                    onClick={uploadFiles}
                    sx={{
                        backgroundColor: '#008F91',
                        '&:hover': {
                            backgroundColor: '#00B7AF' // Change the color to your desired hover color
                        }
                    }}>
                    Upload Files
                </Button>
                <Divider variant='middle' sx={{ marginTop: '20px', backgroundColor: 'grey' }} />
                <Button
                    sx={{ marginTop: '70px', backgroundColor: '#008F91', '&:hover': { backgroundColor: '#00B7AF' } }}
                    variant="contained"
                    component="label"
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </DemoPaper>

            {/* No Files Selected */}
            <React.Fragment>
                <Dialog
                    open={openNoFiles}
                    onClose={handleCloseNoFiles}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth='sm'
                    sx={{ textAlign: 'center' }}
                >
                    <DialogTitle id="alert-dialog-title">
                        <div style={{ textAlign: 'center' }}>
                            <ErrorOutlineIcon sx={{ color: 'black' }} />
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please Select a File!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNoFiles} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

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

            {/* Successful Upload */}
            <React.Fragment>
                <Dialog
                    open={openSuccessUpload}
                    onClose={handleCloseSuccessUpload}
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
                            Files Uploaded Successfully!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSuccessUpload} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            {/* Unsuccessful Upload*/}
            <React.Fragment>
                <Dialog
                    open={openUnsuccessfulUpload}
                    onClose={handleCloseUnsuccessfulUpload}
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
                            Files Upload Unsuccessful! Please try again!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseUnsuccessfulUpload} autoFocus>
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
                            Files Submitted Successfully!
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
                            Files Submission Unsuccessful! Please try again!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseUnsuccess} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div>
                    <div>
                        {flag3 && <Alert variant="filled" severity="warning">
                            Please select a File!!!
                        </Alert>}
                    </div>
                    <div>
                        {flag2 == 1 && <Alert variant="filled" severity="info">
                            Upload in Progress...
                        </Alert>}
                    </div>
                    <div>
                        {flag2 == 2 && <Alert variant="filled" severity="success">
                            Files Uploaded!
                        </Alert>}
                    </div>
                    <div>
                        {flag == 1 && <Alert variant="filled" severity="info">
                            Submission in Progress...
                        </Alert>}
                    </div>
                    <div>
                        {flag == 2 && <Alert variant="filled" severity="success">
                            Files Submitted successfully!
                        </Alert>}
                    </div>
                    <div>
                        {flag == 3 && <Alert variant="filled" severity="error">
                            Incorrect Aadhar Number. Please submit again!
                        </Alert>}
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default AddFiles;

