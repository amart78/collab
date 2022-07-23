import React, { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import {Avatar, AvatarGroup, Box, Grid, Card, Typography, CardMedia, CardContent } from '@mui/material';


function ProjectCard({ leaveProject, joinProject }) {
  const [project, setProject] = useState(null)
  let params = useParams();


  const fetchProjectCallback = useCallback(() => {
    fetch(`/projects/${params.projectId}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(project => setProject(project))
  }, [params.projectId])
  
  useEffect(() => {
    fetchProjectCallback()
  }, [fetchProjectCallback])

  const leaveOrJoinButton = (project) => {
    if (project.user_project) {
      return (
        <button
          onClick={() => leaveProject(project.id).then(() => fetchProjectCallback())}
        >
          Leave Project
        </button>
      )
    } else {
      return (
        <button
          onClick={() => joinProject(project.id).then(() => fetchProjectCallback())}
        >
          Join Project
        </button>
      )
    }
  }

  if(!project){ return <div></div>}
  
  return (
  <div>
     <Grid item xs={4} sm={3} md={2.35} key = {project.id} >
            
       <Card  align='center' sx={{ display: 'flex', minWidth: 200, maxWidth: 500 }}color = 'secondary' elevation={3}>
         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              

          <CardContent style={{color: 'white', backgroundColor: 'DodgerBlue'}} sx={{ flex: '1 0 auto' }}>
              <Typography gutterBottom variant='h5'component='div' >
                {project.name}
              </Typography>

              <Typography align='left' variant='h6' component='div' >
                Members:
                 <Typography color= 'text.secondary' variant='subtitle1' component='div' >
                    {project.members?.map(member => 
                    <ul >
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', pl: 1, pb: 1 }}>
                        
                      <Avatar  alt={member.name} src={member.image} />
                        {member.name}
                      </Box>
                     
                    </ul>)}
                </Typography>
              </Typography>

              <Typography align='left' variant='h6' component='div'>
                Tasks: 
                  <Typography align='left' color= 'text.secondary' variant='subtitle1' component='div' >
                    {project.tasks?.map((task) => <li>{task.title}</li>)}
                  </Typography>
              </Typography>   
            </CardContent>
          </Box>
          <CardMedia sx={{ width: 200 }} style={{padding: '5%'}}>    
            <img 
              component = 'img' 
              src = {project.image} 
              alt= {project.name} 
            />
          </CardMedia>
        </Card>

    </Grid>
  </div>
  )
  }
  


export default ProjectCard