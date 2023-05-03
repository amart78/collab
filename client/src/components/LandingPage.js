import React, { Fragment } from 'react';
import { Button, Card, CardMedia, Container, CssBaseline, GlobalStyles, Grid, Link, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function LandingPage() {
  let navigate = useNavigate();

  return (
    <Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none'} }} />
      <CssBaseline />
      
      {/* Hero unit */}
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 5, pb: 4 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Let's Collab!
        </Typography>

        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Collab gets things done. ✅ Utilize the power of project management to achieve success. 🚀
          Our intuitive framework empowers your team to collab, effortlessly. 💪
        </Typography>
      </Container>

      <Container maxWidth="md" component="main" sx={{ pt: .5, pb: 3 }}>
        <Card variant="outlined">
          <CardMedia
            component="img"
            height="275"
            image="https://www.peppybiz.com/wp-content/uploads/2020/07/How-To-Organize-Work-With-Visual-Task-Management_banner.jpg"
            alt="Teamwork art"
            />
          </Card>
        </Container>
      {/* End hero unit */}

      <Container align="center" maxWidth="xs" component="main">
        <Button onClick={() => navigate("/signup")} variant="contained" color='primary' size="large" sx={{ my: 1, mx: 1.5 }} >
           Get Started ➡️
        </Button>
      </Container>
        
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 6,
          py: [5, 3],
        }}
        
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary" underline="hover">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}


    </Fragment>
  );
}


const footers = [
  {
    title: 'Company',
    description: ['About', 'Contact Us'],
  },
  {
    title: 'Media',
    description: [
      'Youtube',
      'Twitter'
    ],
  },
  {
    title: 'Resources',
    description: ['Our Blog', 'Conferences'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://collab.com/" underline="hover">
        Collab
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default LandingPage;