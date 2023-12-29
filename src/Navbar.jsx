import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

//Material UI imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';


function Navbar() {

  const location = useLocation();
  const nav = useNavigate();
  const [isOpen, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleAddPatient() {
    setOpen(false);
    nav('/addPatient', { state: location.state });
  }

  function handleUpload() {
    setOpen(false);
    nav('/addFiles', { state: location.state });
  }

  function handleDashboard() {
    setOpen(false);
    nav('/dashboard', { state: location.state });
  }

  function handleLogout() {
    setOpen(false);
    const isLoggedIn = false;
    nav('/', { state: { isLoggedIn } });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {location.state?.isLoggedIn && <MenuIcon onClick={handleDrawerOpen} />}

            <Drawer anchor='left' open={isOpen} onClose={() => setOpen(false)}>
              <Box p={2} width='250px' textAlign='left' role='presentation' sx={{ padding: '25px' }}>
                <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>Menu</Typography>
                <hr />
                <hr />

                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} onClick={handleDashboard} className='effect'>Dashboard</Typography>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} onClick={handleAddPatient} className='effect'>Register a Patient</Typography>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} onClick={handleUpload} className='effect'>Upload Files</Typography>

              </Box>

              <Box p={2} width='250px' textAlign='left' role='presentation' sx={{ padding: '25px', marginTop: 'auto' }}>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} className='effect' onClick={handleLogout}>Logout</Typography>
              </Box>
            </Drawer>

          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            Birac Jan Care
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

  );
}

export default Navbar;
