import React,
     { useState  }                        from 'react';
import CssBaseline                        from '@mui/material/CssBaseline';
import AppBar                             from '@mui/material/AppBar';
import Box                                from '@mui/material/Box';
import Container                          from '@mui/material/Container';
import Toolbar                            from '@mui/material/Toolbar';
import Paper                              from '@mui/material/Paper';
import Stepper                            from '@mui/material/Stepper';
import Step                               from '@mui/material/Step';
import StepLabel                          from '@mui/material/StepLabel';
import Button                             from '@mui/material/Button';
import Link                               from '@mui/material/Link';
import Typography                         from '@mui/material/Typography';
import { createTheme, 
         ThemeProvider }                  from '@mui/material/styles';
import MemberProfile                      from './AAA_MemberProfile';
import MemberReview                       from './MemberReview';
import { useHistory}                      from 'react-router';
import app                                from "../../firebase";
import { getAuth, 
         createUserWithEmailAndPassword } from "firebase/auth";
import store                              from '../../store/index';
import Alert                              from '@mui/material/Alert';
import IconButton                         from '@mui/material/IconButton';
import Collapse                           from '@mui/material/Collapse';
import CloseIcon                          from '@mui/icons-material/Close';

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

const steps = ['ユーザー登録', '内容確認'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <MemberProfile />;
    case 1:
      return <MemberReview />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function UserRegistration() {

  // アラート表示
  const [open, setOpen] = useState(false);

  // 画面遷移用のステップ
  const [activeStep, setActiveStep] = useState(0);

  // log表示
  const logOutput = (e) => {
    console.log("nick: ",store.getState().nicknameErrorMS)
    console.log("add: ",store.getState().addressErrorMS)
    console.log("lac: ",store.getState().locationErrorMS)
    console.log("pass: ",store.getState().passwordErrorMS)
  }

  const handleNext = (e) => {
    console.log("activeStep => ",activeStep)
    var errFlg = 0
    switch (activeStep){
      case 0:
        console.log("確認すること")
        // ニックネームの未入力
        if(store.getState().displayName === ""){
          console.log("1.ニックネーム未入力")
          errFlg = 1
          store.getState().nicknameErrorMS = "1.ニックネーム未入力"
        }else{
          store.getState().nicknameErrorMS = ""
        }
        // 所在地の未入力
        if(store.getState().location === ""){
          console.log("2.所在地の未入力")
          errFlg = 1
          store.getState().locationErrorMS = "2.所在地の未入力"
        }else{
          store.getState().locationErrorMS = ""
        }

        // メールアドレスの未入力
        if(store.getState().address === ""){
          console.log("3.メールアドレスの未入力")
          errFlg = 1
          store.getState().addressErrorMS = "3.メールアドレスの未入力"
        }else{
          store.getState().addressErrorMS = ""
        }

        // パスワードの未入力
        if(store.getState().password1 === ""){
          console.log("4.パスワードの未入力")
          errFlg = 1
          store.getState().passwordErrorMS = "4.パスワードの未入力"
        }else{
          store.getState().passwordErrorMS = ""
        }

        //　パスワードの入力ミス
        if(store.getState().password1 !== store.getState().password2){
          console.log("5.パスワードの入力ミス")
          console.log("パスワードは英数字6文字以上")
          errFlg = 1
        }else{

        }
        if(errFlg === 0){
          setOpen(false)
          setActiveStep(activeStep + 1);
          console.log("errFlg : ",errFlg)
          break  
        }else{
          setOpen(false)
          console.log("エラー出てます")
          console.log(store.getState())
          setOpen(true)
          break
        }
      case 1:
        console.log("Firebaseに登録")
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, 
          store.getState().address, 
          store.getState().password1)
        .then((userCredential) => {
          // Signed in 
          console.log("userCredential => ",userCredential);
          const user = userCredential.user;
          console.log("Firebaseに登録されました");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error        => ",error);
          console.log("errorCode    => ",errorCode);
          console.log("errorMessage => ",errorMessage);
          console.log("登録失敗しました。");
        });
      }
    }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    history.push("/userregistration");
    console.log("activeStep => ",activeStep)
  };
  const history = useHistory();
  const toppage = (event) =>{
    history.push("/");
  };
  const mypage = (event) =>{
    history.push("/mypage");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            無料ユーザー登録をする
          </Typography>
        </Toolbar>

      {/* ユーザー登録失敗時のエラーアラート表示(start) */}
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}>
            ユーザー登録に失敗しました。<br/>
            {store.getState().nicknameErrorMS}<br/>
            {store.getState().locationErrorMS}<br/>
            {store.getState().addressErrorMS}<br/>
            {store.getState().passwordErrorMS}<br/>
        </Alert>
      </Collapse>
      {/* ログイン失敗時のエラーアラート表示(end) */}

      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            ユーザー登録
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>

                <Typography variant="h5" gutterBottom>
                  ようこそ！{store.getState().displayName}さん
                </Typography>
                <Typography variant="subtitle1">
                  ユーザー登録が完了しました。
                  あなたの素晴らしい作品をたくさん投稿して仲間とたくさんアイディアを共有して
                  DIYを楽しみましょう！
                </Typography>
                <Button onClick={toppage} sx={{ mt: 3, ml: 1 }}>
                      閲覧ページTOP
                </Button>
                <Button onClick={mypage} sx={{ mt: 3, ml: 1 }}>
                      Myページへ
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep === 0 && (
                    <Button onClick={toppage} sx={{ mt: 3, ml: 1 }}>
                          閲覧ページTOPに戻る
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      戻る
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? '確定する' : '次へ'}
                  </Button>
                  <Button
                    onClick={logOutput}>test</Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}