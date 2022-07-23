import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card, Typography, CardContent } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useApexInfoStyles } from '@mui-treasury/styles/info/apex';
import { useGraphicBtnStyles } from '@mui-treasury/styles/button/graphic';

function TasksList({ projects, tasks, removeAssignmentToTask, cancelTask, assignToTask, createTask }) {

  // functionality----------------------------------------------------------------------------
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [taskId, settaskId] = useState(0)
  const [projectId, setProjectId] = useState(null)

  const assignOrCancelButton = (task) => {
    if (task.user_task) {
      return <button onClick={() => removeAssignmentToTask(task.id)}> Unassign </button>
    } else {
      return <button onClick={() => assignToTask(task.id)}> Assign </button>
    }
  }

  const cancelTaskButton = (task) => {
    if (task.user_is_creator) {
      return <button onClick={() => cancelTask(task.id)}>Cancel Task</button>
    }
  }

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
    setDueDate('')
    settaskId(0)
  }

  // functionality----------------------------------------------------------------------------

  const useStyles = makeStyles(() => ({
    root: {
      height: '100%',
      transition: '0.3s',
      position: 'relative',
      '&:before': {
        transition: '0.2s',
        position: 'absolute',
        width: '100%',
        height: '100%',
        content: '""',
        display: 'block',
        backgroundColor: '#d9daf1',
        borderRadius: '1rem',
        zIndex: 0,
        bottom: 0,
      },
      '&:hover': {
        '&:before': {
          bottom: -6,
        },
        '& $card': {
          boxShadow: '-12px 12px 64px 0 #bcc3d6',
        },
      },
    },
    card: {
      zIndex: 1,
      position: 'relative',
      borderRadius: '1rem',
      boxShadow: '0 6px 20px 0 #dbdbe8',
      backgroundColor: 'lilac',
      transition: '0.4s',
      height: '100%',
    },
    logo: {
      width: 48,
      height: 48,
      borderRadius: '0.75rem',
    },
    avatar: {
      fontFamily: 'Ubuntu',
      fontSize: '0.875rem',
      backgroundColor: '#6d7efc',
    },
    join: {
      background: 'linear-gradient(to top, #638ef0, #82e7fe)',
      '& > *': {
        textTransform: 'none !important',
      },
    },
  }));

  const CustomCard = ({
    task,
    thumbnail,
    title,
    subtitle,
    description,
    joined = false,
  }) => {
    const styles = useStyles();
    const btnStyles = useGraphicBtnStyles();
    return (
      <div className={styles.root}>
        <Column className={styles.card}>
          <Row p={2} gap={2}>
            <Avatar className={styles.logo} variant={'rounded'} src={thumbnail} />
            <Info position={'middle'} useStyles={useApexInfoStyles}>
              <InfoTitle >{title}</InfoTitle>
              <InfoSubtitle>{subtitle}</InfoSubtitle>
            </Info>
          </Row>
          <Box
            pb={1}
            px={2}
            color={'grey.600'}
            fontSize={'0.875rem'}
            fontFamily={'Ubuntu'}
          >
            {description}
          </Box>
          <Row p={2} gap={2} position={'bottom'}>
            <Item>
              <AvatarGroup max={4} classes={{ avatar: styles.avatar }}>
                {new Array(5).fill(0).map((_, index) => (
                  <Avatar
                    key={index}
                    src={`https://i.pravatar.cc/300?img=${index}`}
                  />
                ))}
              </AvatarGroup>
            </Item>
            <Item position={'middle-right'}>
              <Button
                className={styles.join}
                classes={btnStyles}
                variant={'contained'}
                color={'primary'}
                disableRipple
                onClick={ () => cancelTask(task.id)}
              >
                Delete
              </Button>
            </Item>
          </Row>
        </Column>
      </div>
    );
  };

  return (
    <div>
      
      <h1>Tasks</h1>
      <Grid container spacing={2}>
        {tasks.map(task => (
          <Grid item xs={12} md={6} lg={4}>
            
            <CustomCard
              
              thumbnail={task.image}
              task={task}
              title={task.title}
              subtitle={`Due: ${task.due_date}`}
              description={
                <>
                Details: {task.description}
                </>
              }
            />
          </Grid>
          ))}
        </Grid>
      {/* {tasks.map(task => (  
      <Grid item xs={4} sm={3} md={2.35} >
      
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
          </CardContent> */}

          {/* <Button 
                size="small" 
                color="primary" 
                component='div'
                onClick = { () => {
                    villager.id = Math.random()

                    fetch("http://localhost:3001/favorites", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(villager),
                      })
                        .then(resp => resp.json())
                        .then(addFavorite);
                        }
                    }
                >
                    Favorite ♥
            </Button> */}
            
        {/* </Card> */}
      
    {/* </Grid>
))} */}
      {/* ogcode */}


      {/* {tasks.map(task => (
        <p key={task.id}>
          <Link to={`my-tasks/${task.id}`}>
            {task.title}
          </Link> 
            --- {assignOrCancelButton(task)} {task.user_is_creator && '--- '} {cancelTaskButton(task)}
        </p>
      ))} */}
      <h3>Add Task</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
        </p>
        <p>
          <label htmlFor="description"> Description </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
        </p>
        <p>
          <label htmlFor="due_date"> Due Date </label>
          <input
            type="text"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            name="due_date"
          />
        </p>
        <select
            value={taskId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <label> For which task? </label>
          {/* Default Dropdown Choice */}

          {projects.map(project=>{
            return(
              <option value={project.id} >
                {project.name}
              </option>)

          })}

        </select> 

        <input type="submit" onClick={handleSubmit} value="Submit" />
        {/* <p> */}
          {/* <label htmlFor="task_name">task Name </label>
          <input
            type="text"
            name="task_name"
            value={taskName}
            list="tasks"
            onChange={(e) => settaskName(e.target.value)}
          />
          <datalist id="tasks">
            {tasks.map(task => <option>{task.name}</option>)}
          </datalist>
        </p>
        {" "}<button type="submit">Add Task</button> */}
      </form>
    </div>
  )
}

export default TasksList