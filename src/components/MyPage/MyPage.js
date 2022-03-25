import React,
     { useState  }       from 'react';
import app               from "../../firebase";
import { getAuth }       from "firebase/auth";
import CssBaseline       from '@mui/material/CssBaseline';
import Container         from '@mui/material/Container';
import { createTheme, 
         ThemeProvider } from '@mui/material/styles';
import MyPageHeader      from './MyPageHeader';
import { withRouter }    from 'react-router';
import Footer            from '../Footer';
import Typography        from '@mui/material/Typography';
import store             from '../../store/index';
import MyPageButton      from './MyPageButton';
import Stack             from '@mui/material/Stack';
import Avatar            from '@mui/material/Avatar';

const theme = createTheme();
  
function MyPage(props) {
  const auth = getAuth(app)
  const [form , setForm] = useState({ 
    displayName      : store.getState().displayName     ,
    location         : store.getState().location        ,
    nicknameErrorMS  : store.getState().nicknameErrorMS ,
    locationErrorMS  : store.getState().locationErrorMS ,
    addressErrorMS   : store.getState().addressErrorMS  ,
    passwordErrorMS  : store.getState().passwordErrorMS ,
    photoFileData    : store.getState().photoFileData   ,
    photoURL         : store.getState().photoURL        ,
    phoneNumber      : store.getState().phoneNumber     ,
  });
  console.log(store.getState())
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth>
        <MyPageHeader/>
      </Container>

      <Container maxWidth="sm">
          <br/>
          <Container align= "center">
            <Avatar
              alt="preview"
              src={auth.currentUser.photoURL}
              sx={{ width: 150, height: 150 }}/>
          <Typography variant="body1" gutterBottom align='center'>
            {form.displayName}
          </Typography>
          </Container>

          <Typography variant="h5" gutterBottom align='left'>
            所在地：{store.getState().location}
          </Typography>
          <Typography variant="h5" gutterBottom align='left'>
            メールアドレス：{auth.currentUser.email}
          </Typography>
          
          <Typography variant="h5" gutterBottom align='center'>
            <Stack spacing={2} direction='column'>
              <MyPageButton
                variant = "outlined"
                text = "お気に入り"></MyPageButton>
              <MyPageButton
                variant = "outlined"
                link    = "/mypage/edit"
                text = "プロフィール編集"></MyPageButton>
            </Stack>
          </Typography>

      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}

export default withRouter(MyPage);