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

function AddFiles() {

     const nav = useNavigate();
     const location = useLocation();
     const [files, setFiles] = useState(null); 
     const [aadhar, setAadhar] = useState(null);
     const [URL, setURL] = useState([]);
     const [flag, setFlag] = useState(0);
     const [flag2, setFlag2] = useState(0); 
     const [flag3, setFlag3] = useState(false); 
     var hospitalID = null;

     useEffect(() => {
          hospitalID = location.state?.id;
     });

     const uploadFiles = async () => {
          
          if(files === null) {
               setFlag3(true);
               console.log("No files selected");
               return ;
          }
          else{
               setFlag3(false);
               setFlag2(1);
               if (files) {
                    for (let i = 0; i < files.length; i++) {
                         const file = files[i];
                         const fileRef = ref(storage, `files/${file.name}`);
                         
                         try {
                              await uploadBytes(fileRef, file);
                              const downloadURL = await getDownloadURL(fileRef);
                              // console.log("Download URL:", downloadURL);
                              setURL(prevURLs => [...prevURLs, downloadURL]);
                         } catch (error) {
                              console.error("Error uploading file:", error);
                         }
                    }
               }
               console.log("Uploaded");
               setFlag2(2);
          }
     }

     function handleAadharChange(event) {
          setAadhar(event.target.value);
     }

     function handleChange(event) {
          setFiles(event.target.files);
     }

     async function handleSubmit(event) {
          setFlag2(0);
          setFlag(1);

          event.preventDefault();
          console.log("submit button clicked");

          // console.log(location.state);
          if (URL.length !== 0) {
               const obj = {
                    files: URL,
                    aadhar: aadhar,
                    hospitalId: hospitalID
               };

               try {
                    const response = await axios.post('https://birac-jan-care.onrender.com/task/transact', obj);
                    console.log("Server response:", response.data);
                    
                    setFlag(2);
                    setTimeout(() => {
                         nav('/dashboard', { state: location.state });
                    }, 3000);
               } catch (error) {
                    console.error("Error sending data to server:", error);
                    setFlag2(false);
                    setFlag(3);
                    setTimeout(() => {
                         window.location.reload();
                    }, 3000);
               }
          }
     }


     return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
               <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                         <TextField onChange={handleAadharChange} id="outlined-basic" name="aadhar" label="Aadhar" variant="outlined" />
                         <Button
                              variant="contained"
                              component="label"
                         >
                              Choose File
                              <input
                                   type="file"
                                   multiple
                                   hidden
                                   onChange={handleChange}
                              />
                         </Button>
                    </div>
               </div>
               
               <hr />
               <div>
                    <Button
                         variant="contained"
                         component="label"
                         onClick={uploadFiles}>
                         Upload File
                    </Button>
               </div>
               <hr />
               <div>
                    <Button
                         variant="contained"
                         component="label"
                         onClick={handleSubmit}>
                         Submit
                    </Button>
               </div>
               <hr />
               
               <div>
                    <div>
                         {flag3 && <Alert variant="filled" severity="warning">
                         Please select a File!!!
                         </Alert>}
                    </div>
                    <div>
                         {flag2==1 && <Alert variant="filled" severity="info">
                         Upload in Progress...
                         </Alert>}
                    </div>
                    <div>
                         {flag2==2 && <Alert variant="filled" severity="success">
                         Files Uploaded!
                         </Alert>}
                    </div>
                    <div>
                         {flag==1 && <Alert variant="filled" severity="info">
                         Submission in Progress...
                         </Alert>}
                    </div>
                    <div>
                         {flag==2 && <Alert variant="filled" severity="success">
                         Files Submitted successfully!
                         </Alert>}
                    </div>
                    <div>
                         {flag==3 && <Alert variant="filled" severity="error">
                         Incorrect Aadhar Number. Please submit again!
                         </Alert>}
                    </div>
               </div>
          </div>
     );
}

export default AddFiles;

