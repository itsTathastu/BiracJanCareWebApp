import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import DisplayBlock from './DisplayBlock';

function Last3blocks() {

    const location = useLocation();
    const [blocks, setBlocks] = React.useState([]);

    async function fetchData() {
        try {
            const response = await axios.get('https://birac-jan-care.onrender.com/task/getLastThreeBlocks', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': location.state?.token
                }
            });
            console.log(response.data);
            setBlocks(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, m: 2, marginTop: '10px', textAlign: 'center' }}>
                Last 3 Blocks
            </Typography>

            <Grid container rowSpcaing={5} sx={{ padding: '10px' }}>
                <Grid item xs={12}>
                    <Item sx={{ padding: '10px' }}>
                        {blocks[0] && <DisplayBlock arr={blocks[0]} />}
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item sx={{ padding: '10px' }}>
                        {blocks[1] && <DisplayBlock arr={blocks[1]} />}
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item sx={{ padding: '10px' }}>
                        {blocks[2] && <DisplayBlock arr={blocks[2]} />}
                    </Item>
                </Grid>
            </Grid>
        </>
    );
}

export default Last3blocks;
