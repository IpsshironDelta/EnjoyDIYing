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
import Button from '@mui/material/Button';
import { getAuth } from "firebase/auth";

const theme = createTheme();

function UserRegistrationComplete(props) {

  const clickhandletest = () => {
    console.log("clickhandletest通過")
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const uid = user.uid;
      console.log("displayName =>",displayName)
      console.log("email",email)
      console.log("photoURL =>",photoURL)
      console.log("uid =>",uid)
    }
  }

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
          <Button
            onClick={clickhandletest}>テスト</Button>
        </Container>
      {/* Footer */}
      <URFooter/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(UserRegistrationComplete);
