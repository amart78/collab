import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";


function AuthNav({ currentUser, setCurrentUser  }) {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (e, newValue) => {
      setValue(newValue);
    };
    const handleLogout = () => {
      fetch(`/logout`, {
        method: 'DELETE',
        credentials: 'include'
      })
        .then(res => {
          if (res.ok) {
            setCurrentUser(null)
            navigate('/')
          }
        })
    }

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
        <Toolbar sx={{flexWrap: 'wrap' }}>
        <Avatar
            alt="Collab Logo"
            src="https://library.kissclipart.com/20181215/hww/kissclipart-project-management-clipart-project-management-a0814336cee94362.png"
            sx={{ width: 56, height: 56 }}
          />
          <Typography  variant="h6" color="primary" noWrap sx={{ flexGrow: 1 }}>
            Collab.
          </Typography>
         
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/my-projects"
              sx={{ my: 1, mx: 1.5, ml:2 }}
              underline="hover"
          >
              Projects
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/my-tasks"
              sx={{ my: 1, mx: 1.5 }}
              underline="hover"
              padding={2}
            >
              Tasks
            </Link>
          </nav>
          <Button onClick={handleLogout} variant="outlined" color='primary' sx={{ my: 1, mx: 1.5 }} >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      </React.Fragment>

    );
  }
  export default AuthNav;