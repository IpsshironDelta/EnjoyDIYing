import * as React        from 'react';
import Box               from '@mui/material/Box';
import Typography        from '@mui/material/Typography';
import Container         from '@mui/material/Container';
import { createTheme,
         ThemeProvider } from '@mui/material/styles';
import { useHistory,
         withRouter }    from 'react-router';
import MainPageHeader    from './MainPageHeader';
import MainPageImageList from './MainPageImageList';
import Footer            from '../Footer';
import Grid              from '@mui/material/Grid';
import Stack             from '@mui/material/Stack';
import LoginIcon         from '@mui/icons-material/Login';
import PersonAddIcon     from '@mui/icons-material/PersonAdd';
import MainPageButton    from './MainPageButton';

const theme = createTheme({
  palette: {
    // ボタンのカラー設定
    primary: {
      main: '#E64545',
      contrastText: '#ffffff',
    },
    // 背景のカラー設定
    background: {
      default: '#ffffff',
    },

    // テキストのカラー設定
    text: { primary: '#000000' },
  },
});

const maipageImg = 
"https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/001_mainpage_img.png?alt=media&token=45e8f94b-d11d-480d-b53c-354af173afbf"
const subImg_001 = 
"https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/002_mainpage_img.jpg?alt=media&token=0c3d54d8-dcee-469b-b725-58d8956f18ea"
const subImg_002 = 
"https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/004_mainpage_img.jpg?alt=media&token=c9523ba0-bc4b-4a79-8798-a2f24c7c4588"
const subImg_003 = 
"https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/003_mainpage_img.jpg?alt=media&token=b9674d81-538b-4d18-a003-37599ab4d8fd"


function Album(props) {
  const history = useHistory();
  const mypage = (event) =>{
    history.push("/mypage");
  };
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth>
        <MainPageHeader/>
      </Container>
      <br/><br/>

      <Container maxWidth>
      <Grid container spacing={0} sx={{backgroundColor:'#E64545',height: '310px' }}>
        <Grid item xs={6}>
          <Typography variant="h4" align="center">
            <strong><br/>その "アイディア" を "カタチ" に</strong>
          </Typography>
          <Typography variant="h6" align="center">
            色、デザイン、工夫、アイディアetc...<br/>
            自由な発想、自由なアイディア、自由な工夫を探し出し、<br/>
            仲間が作った”これ、考えた人すごいね。”というような<br/>
            アイディアを共有してDIYを楽しみましょう。<br/><br/>
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} align = "right">
              <MainPageButton
                variant   = 'contained'
                startIcon = {<PersonAddIcon/>}
                sx        = {"background-color:#3D85CC"}
                text      = "新規登録"/>
            </Grid>
            <Grid item xs={6} align = "left">
              <MainPageButton
                  variant   = 'contained'
                  startIcon = {<LoginIcon/>}
                  sx        = {"background-color:#3D85CC"}
                  text      = "ログイン"/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" align='center'>
            <img 
              src     = {maipageImg}
              width   = "350px" 
              alt     = "preview"
              padding = "1em"/>
          </Typography>
        </Grid>
      </Grid>
      </Container>

      <Container maxWidth>
      <Grid container spacing={0} >
        <Grid item xs={12}>
          <Typography variant="h5" align="center" color="#000000">
            <strong><br/>その "考え" を探しましょう！</strong>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" align="center" color="#ff3838">
            <strong><br/>1.アイディアの参考に</strong>
          </Typography>
          <Typography variant="body2" align='center'>
            <img 
              src     = {subImg_001}
              width   = "250px" 
              alt     = "preview"
              padding = "1em"/>
          </Typography>
          <Typography variant="body1" align="center" color="#000000">
            仲間が考えたアイディアを参考にして<br/>
            デザインの発案をお助けします。
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" align="center" color="#ff3838">
            <strong><br/>2.教えて！をカンタンに</strong>
          </Typography>
          <Typography variant="body2" align='center'>
            <img 
              src     = {subImg_002}
              width   = "400px" 
              alt     = "preview"
              padding = "1em"/>
          </Typography>
          <Typography variant="body1" align="center" color="#000000">
            DIY好きの仲間同士で知恵を出し合い<br/>
            問題解決をカンタンにします。
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" align="center" color="#ff3838">
            <strong><br/>3.DIY制作ツールに</strong>
          </Typography>
          <Typography variant="body2" align='center'>
            <img 
              src     = {subImg_003}
              width   = "250px" 
              alt     = "preview"
              padding = "1em"/>
          </Typography>
          <Typography variant="body1" align="center" color="#000000">
            自分だけのDIY作品ツールとしてご利用いただけます。<br/>
          </Typography>
        </Grid>
      </Grid>
      </Container>

      <Container maxWidth = "lg">
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,}}>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="text.primary"
            gutterBottom>
             注目のレシピ
          </Typography>
          <MainPageImageList/>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="text.primary"
            gutterBottom>
              新着レシピ
          </Typography>
          <MainPageImageList/>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="text.primary"
            gutterBottom>
            お気に入りの投稿
          </Typography>
          <MainPageImageList/>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="text.primary"
            gutterBottom>
            さんの過去の作品
          </Typography>
          <MainPageImageList/>
        </Box>
      </Container>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(Album);
