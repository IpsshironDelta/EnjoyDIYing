import   React, 
       { useState,
         useEffect,}     from "react"
import { Alert ,
         Box ,
         Typography,
         Container ,
         TextField ,
         Button , }      from '@mui/material'
import { createTheme,
         ThemeProvider } from '@mui/material/styles'
import { useHistory,
         withRouter }    from 'react-router'
import   InquiryHeader   from './InquiryHeader'
import   Footer          from '../Footer'
import useSignup         from "../hooks/useAuth"
import sendMail          from "../hooks/sendMail"

const theme = createTheme({
  shadows: ["none"],
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
})

const sendmailaddress = 
"ysueda0716@gmail.com"

const inquiryImg = 
"https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/PAGE_USE_IMG%2Finquiry_img.jpg?alt=media&token=c9997f22-a7fe-4911-a516-a0c32beebf5c"

function Inquiry(props) {
  
  const [email, setEmail]                      = useState("")    // メールアドレス入力欄
  const [name, setName]                        = useState("")    // お名前入力欄
  const [comment, setComment]                  = useState("")    // お問い合わせ内容入力欄
  const [error , setError ]                    = useState(false)  // 入力エラー判定
  const [success, setSuccess]                  = useState(false) // 成功判定
  const [sendmailerr , setSendMailErr]         = useState(false) // メール送信エラー判定
  const [sendmailsuccess , setSendMailSuccess] = useState(false) // メール送信エラー判定
  const [errormessage , setErrorMessage]       = useState("")    // エラーメッセージ


  // "送信ボタンクリック時のハンドル"
  const handleSubmit = (event) => {
    // アラートが出ている場合は一旦消す
    setError(false)
    setSuccess(false)
    if(name === ""){
      console.log("お名前未入力")
      setErrorMessage("お名前を入力してください")
      setError(true)
      return
    }
    if(email === ""){
      console.log("mailアドレス未入力")
      setErrorMessage("mailアドレスを入力してください")
      setError(true)
      return
    }
    if(comment === ""){
      console.log("お問い合わせ内容未入力")
      setErrorMessage("お問い合わせ内容を入力してください")
      setError(true)
      return
    }

    // 問合わせメールを送信する
    console.log(sendmailaddress)
    console.log(event)
    // event.preventDefault()
    // sendMail(sendmailaddress)
  }

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth>
            <InquiryHeader/>
        </Container>
        <Container maxWidth = "md" >
            <Box sx={{ flexGrow: 1, m: 2, pt: 4, pb: 4 }}>
                <Container maxWidth>
                  <Typography variant="body2" align='center'>
                    <img 
                      src     = {inquiryImg}
                      width   = "350px" 
                      alt     = "preview"
                      padding = "1em"/>
                  </Typography>
                    <Typography
                        component="h1"
                        variant="h5"
                        align="left"
                        color="text.primary"
                        gutterBottom
                        sx = {{backgroundColor : "#ffffff",
                                color : "#000000",
                                padding: "1rem 2rem",
                                borderBottom: "double #E64545 6px",
                                pt : 5 , 
                                pb : 1 ,}}>
                        お問い合わせ
                    </Typography>
                    <Typography variant="h7"
                                align="left"
                                color="text.primary"
                                gutterBottom
                                sx = {{backgroundColor : "#ffffff",
                                        color : "#000000",}}>
                      お名前：
                    </Typography>
                    <TextField
                      margin       = "normal"
                      fullWidth
                      id           = "name"
                      label        = "お名前"
                      name         = "name"
                      autoComplete = "name"
                      autoFocus
                      value        = {name}
                      onChange     = {e => setName(e.target.value)}/>
                    <Typography variant="h7"
                                align="left"
                                color="text.primary"
                                gutterBottom
                                sx = {{backgroundColor : "#ffffff",
                                        color : "#000000",}}>
                      メールアドレス：
                    </Typography>
                    <TextField
                      margin       = "normal"
                      fullWidth
                      name         = "email"
                      label        = "example@example.com"
                      type         = "email"
                      id           = "email"
                      autoComplete = "current-email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}/>
                    <Typography variant="h7"
                                align="left"
                                color="text.primary"
                                gutterBottom
                                sx = {{backgroundColor : "#ffffff",
                                        color : "#000000",}}>
                      お問い合わせ内容：
                      </Typography>
                      <TextField
                        fullWidth
                        id       = "comment"
                        name     = "comment"
                        multiline
                        rows={6}
                        defaultValue = ""
                        onChange={e => 
                          setComment(e.target.value)}/>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2,}}
                      link = "/"
                      onClick = {handleSubmit}>
                      メールを送信する
                    </Button>
                    {/* メール送信が成功した場合はアラートを出す */}
                    {success && <Alert severity="success">投稿完了しました！</Alert>}
                    {/* メール送信が失敗した場合はアラートを出す */}
                    {error && <Alert severity="error">{errormessage}</Alert>}
                </Container>
            </Box>
        </Container>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(Inquiry);
