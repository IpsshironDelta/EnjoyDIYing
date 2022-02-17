import * as React                         from 'react';
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
import MemberProfile                      from './MemberProfile';
import MemberReview                       from './MemberReview';
import { useHistory}                      from 'react-router';
import app                                from "../../firebase";
import { getAuth, 
         createUserWithEmailAndPassword } from "firebase/auth";
import store                              from '../../store/index';
import URdialogs                          from './URdialogs'

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
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    console.log("activeStep => ",activeStep)
    switch (activeStep){
      case 0:
        console.log("確認すること")
        if(store.getState().nickname === ""){
          console.log("ニックネーム未入力")
        }
        if(store.getState().location === ""){
          console.log("所在地の未入力")
        }
        if(store.getState().password1 !== store.getState().password2){
          console.log("パスワードの入力ミス")
          console.log("パスワードは英数字6文字以上")
        }
        break  
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
          <Typography variant="h6" color="inherit" noWrap>
            無料ユーザー登録をする
          </Typography>
        </Toolbar>
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
                  ようこそ！{store.getState().nickname}さん
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