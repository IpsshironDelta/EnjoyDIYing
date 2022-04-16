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
import usePasswordReset from "../hooks/passWordReSetting"
import PasswordResetHeader from "./PasswordResetHeader"
import {createTheme, 
    ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';  

const theme = createTheme();

export default function PasswordReset() {
    const { success, error, passwordReset } = usePasswordReset()
    const [email, setEmail] = useState("")

    // データ送信後パスワードリセットする
    const handleSubmit = (event) => {
        event.preventDefault()
        passwordReset(email)
    }

  return (
    <ThemeProvider theme={theme}>      
        <Container maxWidth>
            <PasswordResetHeader/>
        </Container>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",}}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            パスワード再設定
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}/>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon = {<SendIcon/>}>
                送信
            </Button>
            <Grid container sx={{ justifyContent: "center" }}>
                <Grid item>
                <Link href="login" variant="body2">
                    戻る
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        {error && (<Alert severity="error">メールアドレスに送信できませんでした</Alert>)}
        {success && (<Alert severity="success">メールアドレスに送信しました</Alert>)}
        </Container>
    </ThemeProvider>
  )
}