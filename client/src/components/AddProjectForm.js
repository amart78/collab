import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Typography, Avatar, Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  button: {
    marginBottom: theme.spacing(2)
  },
}));

function AddProjectForm({ createProject }) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        createProject({
        name,
        image,
        })
        setName('')
        setImage('')
    }
  
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh',  }}>
        <Box  sx={{ maxWidth: 400 }}>
          <Paper elevation={0} square style={{ zIndex: 100 }} >
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
                <AddCircleIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add a Project
              </Typography>
              <Box onSubmit={handleSubmit} className={classes.form} component="form" noValidate  sx={{ mt: 1 }}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    className={classes.textField}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <TextField
                    label="Image"
                    variant="outlined"
                    className={classes.textField}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Add project
                  </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </div>
    );
  }
  export default AddProjectForm;  