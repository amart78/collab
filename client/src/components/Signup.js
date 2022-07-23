import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, {useEffect, useState} from 'react';

function Signup({onLogin}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
          window.location.href = "/my-projects";
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  
  function handleEmail(e){
    setEmail( e.target.value);
  }

  function handlePassword(e){
    setPassword(e.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184635/pexels-photo-3184635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Signup
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePassword}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                   Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://collab.com/">
        Collab
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default Signup;





















// import React, { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'

// function Signup({ setCurrentUser }) {
//   const navigate = useNavigate()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [passwordConfirmation, setPasswordConfirmation] = useState('')
  
//   const handleSubmit = (event) => {
//     event.preventDefault()
//     fetch('/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email,
//         password,
//         password_confirmation: passwordConfirmation
//       })
//     })
//       .then(res => {
//         if (res.ok) {
//           res.json().then(user => {
//             setCurrentUser(user)
//             navigate('/projects')
//           })
//         } else {
//           setCurrentUser({ email: "alexis@flatiron.com" })
//           navigate('/projects')
//           res.json().then(errors => {
//             console.error(errors)
//           })
//         }
//       })
//   }
//   return (
//     <div className="authForm">
//       <form onSubmit={handleSubmit}>
//         <h1>Sign Up</h1>
//         <p>
//           <label 
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <input
//             type="text"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </p>
//         <p>
//           <label 
//             htmlFor="password"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             name=""
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </p>
//         <p>
//           <label 
//             htmlFor="password_confirmation"
//           >
//             Password Confirmation
//           </label>
//           <input
//             type="password"
//             name="password_confirmation"
//             value={passwordConfirmation}
//             onChange={(e) => setPasswordConfirmation(e.target.value)}
//           />
//         </p>
//         <p><button type="submit">Sign Up</button></p>
//         <p>-- or --</p>
//         <p><Link to="/">Log In</Link></p>
//       </form>
//     </div>
//   )
// }

// export default Signup