import * as React        from 'react';
import Button            from '@mui/material/Button';
import Card              from '@mui/material/Card';
import CardActions       from '@mui/material/CardActions';
import CardContent       from '@mui/material/CardContent';
import CardMedia         from '@mui/material/CardMedia';
import CssBaseline       from '@mui/material/CssBaseline';
import Grid              from '@mui/material/Grid';
import Stack             from '@mui/material/Stack';
import Box               from '@mui/material/Box';
import Typography        from '@mui/material/Typography';
import Container         from '@mui/material/Container';
import Link              from '@mui/material/Link';
import { createTheme, 
         ThemeProvider } from '@mui/material/styles';
import { useHistory,
         withRouter }    from 'react-router';
import PWHeader          from './PWHeader';
import Footer            from '../Footer';

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

const theme = createTheme({
  shadows: ["none"],
});

function Album(props) {
  const history = useHistory();
  const mypage = (event) =>{
    history.push("/mypage");
  };
  const toppage = (event) =>{
    history.push("/");
  };
  const blog = (event) =>{
    history.push("/blog");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PWHeader/>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              過去の投稿一覧
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={mypage}>Myページ画面に戻る</Button>
              <Button variant="outlined" onClick={toppage}>閲覧TOP画面に戻る</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      作品タイトル
                    </Typography>
                    <Typography>
                      作品の説明文
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={blog}>作品の詳細へ</Button>
                    <Button size="small" onClick={mypage}>ユーザーページへ</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer/>
    </ThemeProvider>
  );
}

export default withRouter(Album);

