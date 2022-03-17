import React             from 'react';
import CssBaseline       from '@mui/material/CssBaseline';
import Typography        from '@mui/material/Typography';
import Container         from '@mui/material/Container';
import { createTheme,
         ThemeProvider } from '@mui/material/styles';
import Grid              from '@mui/material/Grid';
import { withRouter }    from 'react-router';
import URHeader          from './URHeader';
import URFooter          from './URFooter';
import store             from '../../store/index';
import URButton          from './URButton';

const theme = createTheme();

function UserRegistration(props) {

  const handleCheck = (e) =>{
    console.log("handleCheck通過")
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
            ユーザー情報
          </Typography>
          <Typography variant="h5" gutterBottom align='center'>
            以下の内容で登録します。よろしいですか？
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Typography variant="h6">
              ニックネーム
            </Typography>
            <Typography variant="body1">
              {store.getState().displayName}
            </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                所在地
              </Typography>
              <Typography variant="body1">
                {store.getState().location}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                メールアドレス
              </Typography>
              <Typography variant="body1">
                {store.getState().address}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                パスワード
              </Typography>
              <Typography variant="body1">
                {store.getState().password1}
              </Typography>
            </Grid>
          </Grid>
          <Typography align='center'>
           <URButton
              id      = "registerChancel"
              text    = "入力画面に戻る"
              variant ="outlined"
              link    = "/userregistration"
              sx={{ mt: 3, ml: 1 }}/>
            <URButton
              id      = "registerOk"
              text    = "無料ユーザー登録"
              variant = "contained"
              link    = "/userregistration/Complete"
              sx      = {{ mt: 3, ml: 1 }}/>
          </Typography>
        </Container>
      {/* Footer */}
      <URFooter/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(UserRegistration);
