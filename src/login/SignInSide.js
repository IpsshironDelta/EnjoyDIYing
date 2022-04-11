import React,
     { useState }                     from "react";
import Avatar                         from '@mui/material/Avatar';
import Button                         from '@mui/material/Button';
import CssBaseline                    from '@mui/material/CssBaseline';
import TextField                      from '@mui/material/TextField';
import FormControlLabel               from '@mui/material/FormControlLabel';
import Checkbox                       from '@mui/material/Checkbox';
import Link                           from '@mui/material/Link';
import Paper                          from '@mui/material/Paper';
import Box                            from '@mui/material/Box';
import Grid                           from '@mui/material/Grid';
import LockOutlinedIcon               from '@mui/icons-material/LockOutlined';
import Typography                     from '@mui/material/Typography';
import { createTheme, 
         ThemeProvider }              from '@mui/material/styles';
import { useHistory,
         withRouter  }                from "react-router-dom";
import app                            from "../firebase";
import store                          from '../store/';
import {updateForm}                   from '../actions/memberAction';
import { getAuth, 
         signInWithEmailAndPassword } from "firebase/auth";
import Alert                          from '@mui/material/Alert';
import IconButton                     from '@mui/material/IconButton';
import Collapse                       from '@mui/material/Collapse';
import CloseIcon                      from '@mui/icons-material/Close';
import HeaderTitle                    from "../components/HeaderTitle";
import LoginIcon                      from '@mui/icons-material/Login';
import HomeIcon                       from '@mui/icons-material/Home';

//////////
// 定数 //
//////////
const strAddress     = "address"
const strDisplayName = "displayName"
const strPhotoURL    = "photoURL"

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

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

function SignInSide() {
  // アラート表示
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = useState({
    email    : "",
    password : ""
});
const [form , setForm] = useState({ 
  displayName : store.getState().displayName || '',
  address     : store.getState().address          ,
  photoURL    : store.getState().photoURL         ,
});
const history = useHistory();
const auth = getAuth(app)

const handleHome = () =>{
  history.push("/");
}

const handleSignIn = (event) => {
    signInWithEmailAndPassword(auth, formData.email, formData.password).then((v) => {
        console.log(v);
        event.preventDefault();
        history.push("/");
        console.log("ログイン成功")
        console.log("アドレス",auth.currentUser.email)
        console.log("ニックネーム",auth.currentUser.displayName)
        console.log("画像URL",auth.currentUser.photoURL)
        console.log("uid=>",auth.currentUser.uid)
        storeUpdate(strAddress , auth.currentUser.email)
        storeUpdate(strDisplayName , auth.currentUser.displayName)
        storeUpdate(strPhotoURL , auth.currentUser.photoURL)
    }).catch((e) => {
        console.log(e)
        console.log("ログイン失敗")
        setOpen(true)
    })
}
  // formの内容を入替(更新)する
  const storeUpdate = (orgFile , orgDataInfo ) => {
    console.log("storeUpdate")
    const photo        = orgFile     // サムネイル用の画像表示
    const fileURL      = orgDataInfo // サムネイル用の画像表示
    form[photo]        = fileURL
    const data = form
    setForm({
      ...form,
      photo : orgDataInfo,
    })
    store.dispatch(updateForm(data))
    console.log("form:",form)
  }

const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
}

  return (
    <ThemeProvider theme={theme}>      
      {/* ログイン失敗時のエラーアラート表示(start) */}
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
            ログインに失敗しました。
        </Alert>
      </Collapse>
      {/* ログイン失敗時のエラーアラート表示(end) */}

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <HeaderTitle
              component = "h1"
              variant   = "h5"
              text      = "にログイン"/>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                value={formData.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={formData.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="次回から自動的にログインする"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignIn}
                startIcon = {<LoginIcon/>}>
                  ログイン
              </Button>
              <Typography variant="body2" >
              or
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleHome}
                startIcon = {<HomeIcon/>}>
                  ホーム
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {"パスワードをお忘れの方"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/userregistration" variant="body2"> 
                    {"無料ユーザー登録はこちらから"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
           {/* </Box> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default withRouter(SignInSide);