import React from 'react';
import { useLocation } from 'react-router-dom';
import axios, { all } from 'axios';
import { useState, useEffect } from 'react';
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

function ActivityLog() {

    const location = useLocation();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchBy, setSearchBy] = React.useState('name');

    const columns = [
        { id: 'name', label: 'Name', align: 'center' },
        {
            id: 'aadhar',
            label: 'Aadhar No.',
            align: 'center',
        },
        {
            id: 'date',
            label: 'Date',
            align: 'center',
        },
        {
            id: 'time',
            label: 'Time',
            align: 'center',
        }
    ];
    

    var [rows, setRows] = useState([]);
    var [tempRows, setTempRows] = useState([]);
    var [allRows, setAllRows] = useState([]);

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

        if (searchBy === 'name') {
            // console.log("searching by name");
            const filteredRows = allRows.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()));
            setRows(filteredRows);
        } else {
            // console.log("searching by aadhar");
            const filteredRows = allRows.filter(row => row.aadhar.toLowerCase().includes(event.target.value.toLowerCase()));
            setRows(filteredRows);
        }
    }

    async function fetchData() {
        try {
            const response = await axios.get('https://birac-jan-care.onrender.com/task/getAllTransactions', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': location.state?.token
                }
            });
            setTempRows(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchData1() {
        // console.log(tempRows);
        tempRows.forEach(async (ele) => {
            try {
                // console.log("doing...");
                const response = await axios.get('https://birac-jan-care.onrender.com/task/getPatient/' + ele.patientAadhar, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': location.state?.token
                    }
                });
                // console.log(response.data);
                setAllRows(allRows => [...allRows, { name: response.data.name, aadhar: response.data.aadhar, date: ele.timestamp.substring(0, 10), time: ele.timestamp.substring(11, 19) }]);
            } catch (error) {
                console.error(error);
            }
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData1();
    }, [tempRows]);

    useEffect(() => {
        setRows(allRows);
    }, [allRows]);

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom position='absolute' marginLeft='10px' marginTop='30px'>
                Activity Log
            </Typography>
            <Typography variant="h4" align="center" gutterBottom position='absolute' marginLeft='600px' marginTop='15px'>
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

            <Typography variant="h4" align="center" gutterBottom position='absolute' marginLeft='350px' marginTop='20px'>
                <Input
                    color='success'
                    sx={{ width: '240px', color: 'black' }}
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

            {rows == null && <h1>loading</h1>}
            {rows != null && <Box sx={{ display: 'flex', justifyContent: 'left', paddingTop: 3, marginTop: '60px' }}>
                <Box sx={{position: 'absolute', padding:'10px'}}>
                    <Paper elevation={10} sx={{ width: '700px', height:'190px',overflow: 'scroll', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                        <TableContainer sx={{ maxHeight: 440}}>
                            <Table stickyHeader aria-label="sticky table" >
                                <TableHead >
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
                            rowsPerPageOptions={[5]}
                            component="div"
                            count={rows?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </Box>}
        </>
    );
}

export default ActivityLog;
