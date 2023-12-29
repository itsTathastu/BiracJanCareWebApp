import * as React from 'react';
import { useLocation } from 'react-router-dom';
//Material UI imports
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { Box } from '@mui/material';

function Dashboard() {
  const location = useLocation();
  const hospital_name = location.state?.name;
  const nav = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center' }}>
      <h1>Dashboard</h1>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center' }}>
      <p>Welcome to {hospital_name}</p>
      </Box>
    </div>
  );
}

  export default Dashboard;