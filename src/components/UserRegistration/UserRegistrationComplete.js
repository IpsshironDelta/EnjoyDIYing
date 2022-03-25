import React             from 'react';
import CssBaseline       from '@mui/material/CssBaseline';
import Typography        from '@mui/material/Typography';
import Container         from '@mui/material/Container';
import { createTheme,
         ThemeProvider } from '@mui/material/styles';
import { withRouter }    from 'react-router';
import URHeader          from './URHeader';
import URFooter          from './URFooter';
import store             from '../../store/index';
import URButton          from './URButton';
import { getAuth } from "firebase/auth";

const theme = createTheme();

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
            variant ="outlined"
            link    = "/" 
            sx      = {{ mt: 3, ml: 1 }}
            text    = "閲覧ページTOP"/>                
          <URButton 
            variant ="outlined"
            link    = "/mypage" 
            sx      = {{ mt: 3, ml: 1 }}
            text    = "Myページへ"/>
        </Container>
      {/* Footer */}
      <URFooter/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(UserRegistrationComplete);
