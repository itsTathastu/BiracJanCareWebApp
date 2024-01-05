import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CountUp from 'react-countup';

const Summary = () => {
    const location = useLocation();
    const [monthSummary, setMonthSummary] = useState([]);
    const [dateSummary, setDateSummary] = useState([]);

    async function getMonthSummary() {
        try {
            const today = new Date();
            const date = today.toISOString().split('T')[0];
            const month = date.split('-')[0] + '-' + date.split('-')[1];
            const response = await axios.get(`https://birac-jan-care.onrender.com/task/getTransactionsByMonth/${month}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': location.state?.token
                }
            });
            setMonthSummary(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getDateSummary() {
        try {
            const today = new Date();
            const date = today.toISOString().split('T')[0];
            const response = await axios.get(`https://birac-jan-care.onrender.com/task/getTransactionsByDate/${date}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': location.state?.token
                }
            });
            setDateSummary(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMonthSummary();
        getDateSummary();
    }, []);

    return (
        <Paper id='zoomer' elevation={10} sx={{ backgroundColor: 'rgba(255,255,255,0)', display: 'flex', justifyContent: 'center', padding: '20px', margin: '20px' }}>
            <Grid container rowSpacing={5} columnSpacing={1} sx={{ padding: '10px' }}>
                <Grid item xs={12}>
                    <Divider>
                        <Chip label={"Summary"} size="large" sx={{ backgroundColor: 'success.main', color: 'white' }} />
                    </Divider>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={0} sx={{ backgroundColor: 'rgba(255,255,255,0)', padding: '10px' }}>
                        <CountUp
                            end={dateSummary.length}
                            duration={3}
                            style={{
                                fontSize: 48,
                                color: 'primary.main',
                            }}
                        />
                        <Divider>Transactions Today</Divider>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={0} sx={{ backgroundColor: 'rgba(255,255,255,0)', padding: '10px' }}>
                        <CountUp
                            end={monthSummary.length}
                            duration={3}
                            style={{
                                fontSize: 48,
                                color: 'primary.main',
                            }}
                        />
                        <Divider>Transactions This Month</Divider>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Summary;
