import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CountUp from 'react-countup'; 
import Grid from '@mui/material/Grid';

function DisplayBlock(props) {

    console.log("DisplayBlock");
    console.log(props.arr);

    function countAllFiles(blocks) {
        var count = 0;
        props.arr.forEach((ele) => {
            count += ele.files.length;
        });
        return count;
    }

    function countDistinctNames(blocks) {
        var count = [];
        var distinctNames = new Set();
        props.arr.forEach((ele) => {
            distinctNames.add(ele.patientAadhar);
        });
        return distinctNames.size;
    }

    function handleClick() {
        console.log("clicked");
    }

    return (
        <>
            <Paper onClick={handleClick} id='zoomer' elevation={10} sx={{ backgroundColor: 'rgba(255,255,255,0)', display: 'flex', justifyContent: 'center' }}>
                <Grid container rowSpcaing={5} columnSpacing={1} sx={{ padding: '10px' }}>
                    <Grid item xs={12}>
                        <Divider >
                            {props.arr && <Chip label={"Block ID: " + props.arr[0]?.blockID} size="large" sx={{ backgroundColor: 'success.main', color: 'white' }} />}
                        </Divider>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={0} sx={{ backgroundColor: 'rgba(255,255,255,0)' }}>
                            <CountUp
                                end={props.arr && countDistinctNames(props.arr)}
                                duration={3}  // Set duration in seconds
                                style={{
                                    marginLeft: '110px',
                                    fontSize: 48,
                                }}
                                formattingFn={(value) => value.toFixed(0)}
                            />
                            <Divider>Patients Involved</Divider>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={0} sx={{ backgroundColor: 'rgba(255,255,255,0)' }}>
                            <CountUp
                                end={props.arr && countAllFiles(props.arr)}
                                duration={3}  // Set duration in seconds
                                style={{
                                    marginLeft: '110px',
                                    fontSize: 48,
                                }}
                                formattingFn={(value) => value.toFixed(0)}
                            />
                            <Divider>Files Contained</Divider>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default DisplayBlock;
