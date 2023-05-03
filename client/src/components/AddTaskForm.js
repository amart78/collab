import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  selectField: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  datePicker: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginBottom: theme.spacing(2)
  },
}));

function AddTaskForm({ projects, createTask }) {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [projectId, setProjectId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        createTask({
        title,
        description,
        due_date: dueDate,
        project_id: parseInt(projectId),
        })
        setTitle('')
        setDescription('')
        setDueDate(new Date())
    }
  
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh', width: '15vh' }}>
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
                Add a Task
              </Typography>
              <Box onSubmit={handleSubmit} className={classes.form} component="form" noValidate  sx={{ mt: 1 }}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    className={classes.textField}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    className={classes.textField}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <TextField
                    select
                    label="Project"
                    variant="outlined"
                    className={classes.selectField}
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    required
                    >
                    {projects &&
                        projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                            {project.name}
                        </MenuItem>
                        ))}
                    </TextField>
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    dateFormat="MM/dd/yyyy"
                    className={classes.datePicker}
                    placeholderText="Due date"
                    required
                  />
                  <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Add Task
                  </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </div>
    );
  }
  export default AddTaskForm;  