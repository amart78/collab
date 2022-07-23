import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";


function LandingPageNav() {
    // const [value, setValue] = React.useState(0);
  
    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    // };
    
    // let navigate = useNavigate();
  
    // function handleLogout() {
    //   fetch("/logout", {
    //     method: "DELETE",
    //   }).then(() => onLogout());
    // } 
    let navigate = useNavigate();

    return (
      <React.Fragment>
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
          <Typography  variant="h6" color="primary" noWrap sx={{ flexGrow: 1 }}>
            Collab
          </Typography>
          <nav>
      
          </nav>
          <Button onClick={() => navigate("/login", { replace: true })} variant="outlined" color='primary' sx={{ my: 1, mx: 1.5 }} >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      </React.Fragment>

    );
  }
  export default LandingPageNav;