// Import statements
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

//comun names, 



// Component definition
function TableRender(props) {

    const allRows = props.rows;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchBy, setSearchBy] = React.useState('name');
    const [search, setSearch] = React.useState('');

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

    useEffect(() => {   
        setRows(allRows);
    }, [allRows]);


    return (
        <>
            <Typography variant="h4" align="center" gutterBottom position='absolute' marginLeft='1320px' marginTop='40px'>
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
            
            <Typography variant="h4" align="center" gutterBottom position='absolute' marginLeft='1050px' marginTop='44.5px'>
                <Input
                    color='success'
                    sx={{ width: '250px', color: 'black' }}
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

            <Divider sx={{ position: 'relative', marginTop: '15px', backgroundColor: 'grey' }} variant="middle" />
            <Divider sx={{ position: 'relative', marginTop: '6px', backgroundColor: 'grey' }} variant="middle" />
            {rows == null && <h1>loading</h1>}
            {rows != null && <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2, paddingBottom: 10, paddingLeft: 4, paddingRight: 4, marginTop: '60px' }}>
                <Paper elevation={10} sx={{ width: '95%', overflow: 'hidden',backgroundColor:'rgba(255,255,255,0.8)' }}>
                    <TableContainer sx={{ maxHeight: 440, marginLeft: 5 }}>
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

// Export statement
export default TableRender;
