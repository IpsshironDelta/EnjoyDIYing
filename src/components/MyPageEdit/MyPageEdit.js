import React,
     { useState  }          from 'react';
import { useHistory ,
        withRouter }        from 'react-router';
import CssBaseline          from '@mui/material/CssBaseline';
import Container            from '@mui/material/Container';
import { createTheme, 
         ThemeProvider }    from '@mui/material/styles';
import { useFileUpload }    from "use-file-upload";
import Typography           from '@mui/material/Typography';
import Grid                 from '@mui/material/Grid';
import Stack                from '@mui/material/Stack';
import Button               from '@mui/material/Button';
import Avatar               from '@mui/material/Avatar';
import MyPageEditHeader     from './MyPageEditHeader';
import Footer               from '../Footer';
import store                from '../../store/index';
import {updateForm}         from '../../actions/memberAction';
import app                  from "../../firebase";
import MyPageTextField      from './MyPageTextField'
import MyPageEditSelectBox  from './MyPageEditSelectBox'
import { getStorage }       from "firebase/storage";
import { getAuth, 
          updateProfile}    from "firebase/auth";


const theme = createTheme();

const struct = [
    "",
  ]
  
const MyPageEdit = (props) => {
  console.log(store.getState())
  
  const defaultSrc = ""
    
    // ファイルアップロード用変数
    const [files, selectFiles] = useFileUpload();
    
    // ニックネームの入力チェック用変数
    const [nicknameerr , setNickNameErr] = useState('')

  const [form , setForm] = useState({ 
    displayName      : store.getState().displayName     || '',
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
  // リンク先に遷移
  const history = useHistory();
  const storage = getStorage(app)

  const pushfiles = (source) => {
    console.log("pushfilesを通過")
    const name = "photoURL"
    const fileURL = source
    form[name] = fileURL
    const data = form
    setForm({
      ...form,
      "photoURL" : source,
    })
    store.dispatch(updateForm(data))
    console.log("form:",form)
  }

  // 更新ボタンクリック時のハンドル
  const clickChange = (e) => {
    var name = ""
    var value = ""
    var data = form

    // ニックネームの入力チェック
    if(store.getState().displayName === "")
    {
        name = "nicknameErrorMS"
        value = "ニックネームを入力してください"
        form[name] = value
        data = form
        setNickNameErr('error')
        setForm({
          ...form,
          name : value,
        });
      }else{
        name = "nicknameErrorMS"
        value = ""
        form[name] = value
        data = form
        setNickNameErr('')
        setForm({
          ...form,
          name : value,
        });
      }
      store.dispatch(updateForm(data))
      console.log(data)

      // 入力内容のチェック
    if (store.getState().nicknameErrorMS == "")
    {
      console.log("更新完了")
      // ニックネーム(ユーザー名)と画像URL更新
      const auth = getAuth(app);
      // ニックネーム(ユーザー名)と画像URL更新
      updateProfile(auth.currentUser ,{
        displayName : store.getState().displayName,
        photoURL    : store.getState().photoURL,
        }).then(() => {
            console.log("更新完了")
            console.log("displayName => ",store.getState().displayName)
            console.log("photoURL    => ",store.getState().photoURL)
            console.log("address     => ", store.getState().address)
            console.log("password    => ", store.getState().password1)
        }).catch((error) => {
            console.log("更新失敗")
        })
      history.push("/mypage")
    }else{
      console.log("更新失敗")
    }
  };

  // テキストボックス&セレクトボックス変更のハンドル
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    form[name] = value;
    const data = form;
    setForm({
      ...form,
      [e.target.name] : e.target.value,
  });
  console.log("======以下handleChange内======")
  console.log("name  => ",name);
  console.log("value => ",value);
  console.log("form  => ",form);
  console.log("==============================")
  store.dispatch(updateForm(data))
  };
  
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth>
            <MyPageEditHeader/>
        </Container>
    <Container maxWidth="sm">
        <br/>
            <Container align= "center">
                <Avatar
                  alt="preview"
                  src={files?.source || store.getState().photoURL}
                  padding ="1em"
                  sx={{ width: 150, height: 150 }}/>
                <br/>
                <Button
                    variant="contained"
                    onClick={() =>
                        selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                        console.log("Files Selected", { name, size, source, file })
                        pushfiles(source)
                    })}>
                    画像を変更する
                </Button>
                <br/>

                <Typography variant="body1" gutterBottom align='center'>
                    <MyPageTextField
                        id         = "nicknameEdit"
                        name       = "displayName"
                        type       = "displayName"
                        variant    = "standard"
                        error      = {nicknameerr}
                        helperText = {store.getState().nicknameErrorMS}
                        value      = {store.getState().displayName}
                        onChange   = {handleChange}/>
                    <br/>
                    <br/>
                </Typography>
            </Container>

        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                    所在地：
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <MyPageEditSelectBox
                    name     = "location"
                    type     = "location"
                    value    = {store.getState().location}
                    onChange = {handleChange}/>
            </Grid>
        </Grid>
        <br/>

        <Typography variant="h5" gutterBottom align='center'>
            <Stack spacing={2} direction='column'>
                <Button
                    id      = "myPageUpDate"
                    variant = "contained"
                    link    = "/mypage"
                    onClick = {clickChange}>更新
                </Button>
            </Stack>
        </Typography>
    </Container>

    <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"/>
    </ThemeProvider>
  );
}

export default withRouter(MyPageEdit);