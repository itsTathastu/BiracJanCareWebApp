import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

import Navbar2 from './Navbar2';
//Material UI imports
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";


function Home() {
  const location = useLocation();
  const hospital_name = location.state?.hospital.name;
  const nav = useNavigate();
  const drawerWidth = 240;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      }),
      /**
       * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
       * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
       * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
       * proper interaction with the underlying content.
       */
      position: "relative",
    })
  );

  return (
    <>
      <Main>
        <Navbar2 />
        <h1>Welcome to {hospital_name}</h1>
      </Main>
    </>
  );
}

export default Home;