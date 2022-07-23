import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Grid, Card, Typography, CardContent } from '@mui/material';

function TaskCard({ removeAssignmentToTask, assignToTask, cancelTask }) {
  const [task, setTask] = useState(null)
  const navigate = useNavigate();
  const taskId = useParams().taskId;

  const fetchTaskCallback = useCallback(
    () => {
      fetch(`/tasks/${taskId}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(task => setTask(task))
    },
    [taskId],
  )

  useEffect(() => {
    fetchTaskCallback()
  }, [fetchTaskCallback])


  const cancelTaskButton = (task) => {
    if (task.user_is_creator) {
      return (
        <p>
          <button
            onClick={handleCancel}>Cancel Task</button>
        </p>
      )
    }
  }

  const handleCancel = (e) => {
    cancelTask(task.id);
    navigate('/my-tasks')
  }

  const assignButton = (task) => {
    if (task.user_task) {
      return (
        <button
          onClick={() => {
            removeAssignmentToTask(task.id).then(() => fetchTaskCallback())
          }
        }>
          Cancel Collab
        </button >
      )
    } else {
      return (
        <button
          onClick={() => {
            assignToTask(task.id).then(() => fetchTaskCallback())
          }
        }>
          Collab
        </button>
      )
    }
  }
  
  if(!task) { return <div></div>}
  return (

    <Grid item xs={4} sm={3} md={2.35} key = {task.id} >
            
    <Card  color = 'secondary' elevation={3}>
        <CardContent>
            <Typography gutterBottom variant='h4'component='div' >
                {task.title}
            </Typography>
            <Typography variant='subtitle2' component='div' >
              Created by:  {task.user}
            </Typography>
            <Typography variant='subtitle2' component='div'>
                Due: {task.due_date}
            </Typography>
            <Typography variant='subtitle2'  component='div' >
                Details: {task.description}
            </Typography>
        </CardContent>
      </Card>

    </Grid>
    // OG CODE  -------------------------
    // <div>
    //   <h1>{task.title}</h1>
    //   {cancelTaskButton(task)}
    //   <p>Created by {task.creator} for <Link to={`/my-projects/${task.project.id}`}>{task.project.name}</Link></p>
    //   <p>{task.description}</p>
    //   <p>Due: {task.due_date}</p>
    //   <p>{assignButton(task)}</p>
    //   <ul>
    //     {task.assignees.map(assignee => (
    //       <li>{assignee.name}</li>
    //     ))}
    //   </ul>


    // </div>
  )
}

export default TaskCard
