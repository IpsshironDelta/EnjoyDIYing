import * as React from 'react';
import Sidebar from './Sidebar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory,withRouter } from 'react-router';
import MainPageHeader from './MainPageHeader';
import RecipeList from './RecipeList';
import MainPageImage from './MainPageImage';
import ImageListWithTitleBars from './ImageListWithTitleBars';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const sidebar = {
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};
const theme = createTheme();

function Album(props) {
  const history = useHistory();
  const mypage = (event) =>{
    history.push("/mypage");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Container maxWidth="lg">
        <MainPageHeader/>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="text.primary"
            gutterBottom
          >
            注目のレシピ
          </Typography>
          <ImageListWithTitleBars/>
          <Typography
              component="h1"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              新着レシピ
          </Typography>
          <ImageListWithTitleBars/>
          <Typography
              component="h1"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              お気に入りの投稿
          </Typography>
          <ImageListWithTitleBars/>
          <Typography
              component="h1"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              ＜ユーザー名＞さんの過去の作品
          </Typography>
          <ImageListWithTitleBars/>
          </Box>
        </main>
      </Container>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(Album);
