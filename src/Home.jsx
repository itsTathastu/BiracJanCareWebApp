import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

//Material UI imports
import Navbar2 from './Navbar2';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ActivityLog from './ActivityLog';
import Last3blocks from './Last3blocks';



function Home() {

    const location = useLocation();
    return (
        <>
            <Navbar2 />
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, m: 2, marginTop: '100px', backgroundColor: '' }}>
                Welcome to {location.state?.hospital.name}
            </Typography>

            <Grid container columnSpacing={1} sx={{padding:'10px'}}>
                {/* left column */}
                <Grid item xs={6}>
                    <Paper elevation={10} sx={{ width: '100%', height: '600px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,.8)' }}>
                        <Last3blocks />
                    </Paper>
                </Grid>
                {/* right column */}
                <Grid container rowSpacing={1} item xs>
                    <Grid item xs={12} rowSpacing={1}>
                        <Paper elevation={10} sx={{ width: '100%', height: '295px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,.8)' }}>
                            Summary 
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={10} sx={{ width: '100%', height: '300px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,.8)' }}>
                            <ActivityLog />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;