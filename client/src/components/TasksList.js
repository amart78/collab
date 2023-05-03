import React, { useState } from 'react'
import {Box, Grid, Fab, Modal} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import "react-datepicker/dist/react-datepicker.css";
import AddTaskForm from './AddTaskForm';
import TaskCard from './TaskCard';


function TasksList({projects, tasks, deleteTask, createTask }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <h1>Tasks</h1>
      <Grid container spacing={2}>
        {tasks && tasks.map(task => (
          <Grid item xs={12} md={6} lg={4} key={task.id}>
            <TaskCard
              thumbnail={task.image}
              task={task}
              title={task.title}
              subtitle={`Due: ${task.due_date}`}
              description={
                <>
                Details: {task.description}
                </>
              }
              deleteTask={deleteTask}
            />
          </Grid>
          ))}
      </Grid>

      {/* Add Task Button and Form ------------------- */}
      <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Fab color="primary" variant="extended" aria-label="add" onClick={() => setOpen(true)}>
          <AddIcon /> Add a Task
        </Fab>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400 }}>
          <AddTaskForm 
          projects={projects}
          createTask={createTask} 
          />
        </Box>
      </Modal>  
    </div>
  )
}

export default TasksList