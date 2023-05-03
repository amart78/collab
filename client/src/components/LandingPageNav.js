import React from 'react';
import { AppBar, Avatar, Button, CssBaseline, GlobalStyles, Toolbar, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function LandingPageNav() {
 
    let navigate = useNavigate();

    return (
      <>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Avatar
              alt="Collab Logo"
              src="https://library.kissclipart.com/20181215/hww/kissclipart-project-management-clipart-project-management-a0814336cee94362.png"
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="h6" color="primary" noWrap sx={{ flexGrow: 1 }}>
              Collab
            </Typography>
            <Button onClick={() => navigate("/login", { replace: true })} variant="outlined" color='primary' sx={{ my: 1, mx: 1.5 }} size='large'>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </>

    );
  }
  export default LandingPageNav;