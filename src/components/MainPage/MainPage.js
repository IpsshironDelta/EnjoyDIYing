import * as React        from 'react';
import CssBaseline       from '@mui/material/CssBaseline';
import Box               from '@mui/material/Box';
import Typography        from '@mui/material/Typography';
import Container         from '@mui/material/Container';
import Link              from '@mui/material/Link';
import { createTheme,
         ThemeProvider } from '@mui/material/styles';
import { useHistory,
         withRouter }    from 'react-router';
import MainPageHeader    from './MainPageHeader';
import MainPageImageList from './MainPageImageList';

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

const theme = createTheme();

function Album(props) {
  const history = useHistory();
  const mypage = (event) =>{
    history.push("/mypage");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth>
        <MainPageHeader/>
      </Container>
      <Container maxWidth = "lg">
        <main>
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
          <MainPageImageList/>
          <Typography
              component="h1"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              新着レシピ
          </Typography>
          <MainPageImageList/>
          <Typography
              component="h1"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              お気に入りの投稿
          </Typography>
          <MainPageImageList/>
          <Typography
              component="h1"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              ＜ユーザー名＞さんの過去の作品
          </Typography>
          <MainPageImageList/>
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
