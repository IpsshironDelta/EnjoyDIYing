import React, { useState } from "react"
import {
  Avatar,
  Alert,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import useSignup from "../hooks/useAuth"
import PersonAddIcon     from '@mui/icons-material/PersonAdd';
import SignUpHeader from "./SignUpHeader";
import {createTheme, 
        ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nickname, setNickname] = useState("")

  const { signup, error , success } = useSignup()

  const handleSubmit = (event) => {
    event.preventDefault()
    signup(email, password )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth>
        <SignUpHeader/>
      </Container>
      <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",}}>
        <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          新規ユーザー登録
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
        <Typography variant="h7">
            ニックネーム
          </Typography>
          <TextField
            margin       = "normal"
            fullWidth
            id           = "nickname"
            label        = "ニックネーム"
            name         = "nickname"
            autoComplete = "nickname"
            autoFocus
            value        = {nickname}
            onChange     = {e => setNickname(e.target.value)}/>
          <Typography variant="h7">
            メールアドレス(公開されません)
          </Typography>
          <TextField
            margin       = "normal"
            required
            fullWidth
            id           = "email"
            label        = "メールアドレス"
            name         = "email"
            autoComplete = "email"
            autoFocus
            value        = {email}
            onChange     = {e => setEmail(e.target.value)}/>
          <Typography variant="h7">
            パスワード(公開されません)
          </Typography>
          <TextField
            margin       = "normal"
            required
            fullWidth
            name         = "password"
            label        = "パスワード"
            type         = "password"
            id           = "password"
            autoComplete = "current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "success.main" }}
            link = "/"
            startIcon = {<PersonAddIcon/>}
            onClick = {handleSubmit}>
            この内容で登録する
          </Button>
          {error && <Alert severity="error">ユーザー登録できませんでした</Alert>}
          {success && <Alert severity="success">ユーザー登録が完了しました！</Alert>}
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              <Link href="login" variant="body2">
                ログインはこちら
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>
  )
}