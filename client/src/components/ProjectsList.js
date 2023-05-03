import React, { useState } from 'react'
import {useNavigate,  } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoTitle } from '@mui-treasury/components/info';
import { useApexInfoStyles } from '@mui-treasury/styles/info/apex';
import { useGraphicBtnStyles } from '@mui-treasury/styles/button/graphic';
import AddProjectForm from './AddProjectForm';
import { Fab, Modal} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function ProjectsList({ projects, leaveProject, joinProject, createProject }) {
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
  
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();

  const leaveOrJoinButton = (project, styles, btnStyles) => {
    if (project.user_project) {
      return (
        <Button
        className={styles.join}
        classes={btnStyles}
        variant={'contained'}
        color={'primary'}
        disableRipple
        onClick={() => leaveProject(project.user_project.id)}
      >Leave group</Button>
      )
    } else {
      return (
        <Button
        className={styles.join}
        classes={btnStyles}
        variant={'contained'}
        color={'primary'}
        disableRipple
        onClick={() => joinProject(project.id)}
      >Join group</Button>
      )
    }
  }

  const ProjectSummaryCard = ({
    thumbnail,
    title,
    project,
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
            </Info>
          </Row>
          <Box
            onClick={() => navigate(`/my-projects/${project.id}`)}
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
            <Item position={'middle-right'} >
              {leaveOrJoinButton(project, styles, btnStyles)}
            </Item>
          </Row>
        </Column>
      </div>
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <h1>Projects</h1>
        <Grid container spacing={2} >
        {projects.map(project => (
          <Grid item xs={12} md={6} lg={4}key={project.id}>
            <ProjectSummaryCard
              project={project}
              thumbnail={project.image}
              title={project.name}
              description={
                <>
                  <b>Alexis</b> and others are members of this
                  group.
                </>
              }
            />
          </Grid>
          ))}
        </Grid>
     {/* Add Project Button and Form ------------------- */}
          <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
            <Fab color="primary" variant="extended" aria-label="add" onClick={() => setOpen(true)}>
              <AddIcon /> Add a Project
            </Fab>
          </Box>
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400 }}>
              <AddProjectForm 
                createProject={createProject} 
              />
          </Box>
        </Modal>
    </div>
  )
}

export default ProjectsList;