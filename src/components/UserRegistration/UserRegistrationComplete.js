import React             from 'react';
import CssBaseline       from '@mui/material/CssBaseline';
import Typography        from '@mui/material/Typography';
import Container         from '@mui/material/Container';
import { createTheme,
         ThemeProvider } from '@mui/material/styles';
import { withRouter }    from 'react-router';
import URHeader          from './URHeader';
import store             from '../../store/index';
import URButton          from './URButton';
import EditIcon       from '@mui/icons-material/Edit';
import PersonIcon     from '@mui/icons-material/Person';

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

function UserRegistrationComplete(props) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth>
        <URHeader/>
      </Container>
        <Container maxWidth="sm">
          <br/>
          <Typography variant="h4" gutterBottom align='center'>
            おめでとうございます。
          </Typography>
          <Typography variant="h5" gutterBottom>
            ようこそ！{store.getState().displayName}さん
          </Typography>
          <Typography variant="subtitle1">
            ユーザー登録が完了しました。
            あなたの素晴らしい作品をたくさん投稿して仲間とたくさんアイディアを共有して
            DIYを楽しみましょう！
          </Typography>
          <URButton
            variant   ="outlined"
            link      = "/post" 
            sx        = {{ mt: 3, ml: 1 }}
            text      = "投稿する"
            startIcon = {<EditIcon/>}/>                
          <URButton 
            variant   ="outlined"
            link      = "/mypage" 
            sx        = {{ mt: 3, ml: 1 }}
            text      = "マイページ"
            startIcon = {<PersonIcon/>}/>
        </Container>
    </ThemeProvider>
  );
}

export default withRouter(UserRegistrationComplete);
