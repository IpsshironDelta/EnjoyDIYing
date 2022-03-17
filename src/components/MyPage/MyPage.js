import React,
     { useState  }       from 'react';
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
import Grid              from '@mui/material/Grid';
import { TextField }     from '@mui/material';

const theme = createTheme();
  
function MyPage() {
  console.log(store.getState())
  const [form , setForm] = useState({ 
    displayName         : store.getState().displayName        || '',
    location         : store.getState().location        || '',
    address          : store.getState().address         || '',
    password1        : store.getState().password1       || '',
    password2        : store.getState().password2       || '',
    nicknameErrorMS  : store.getState().nicknameErrorMS,
    locationErrorMS  : store.getState().locationErrorMS,
    addressErrorMS   : store.getState().addressErrorMS ,
    passwordErrorMS  : store.getState().passwordErrorMS,
    photoURL         : store.getState().photoURL       ,
  });
  
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
              alt="Remy Sharp"
              src={store.getState().photoURL}
              sx={{ width: 150, height: 150 }}/>
          <Typography variant="body1" gutterBottom align='center'>
            {store.getState().displayName}
          </Typography>
          </Container>

          <Typography variant="h5" gutterBottom align='left'>
            所在地：{store.getState().location}
          </Typography>
          <Typography variant="h5" gutterBottom align='left'>
            メールアドレス：{store.getState().address}
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