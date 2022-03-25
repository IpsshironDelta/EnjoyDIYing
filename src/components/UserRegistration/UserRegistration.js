import React,
     { useState  }       from 'react';
import { useHistory ,
      withRouter }       from 'react-router';
import { createTheme,
      ThemeProvider }    from '@mui/material/styles';
import CssBaseline       from '@mui/material/CssBaseline';
import Typography        from '@mui/material/Typography';
import Container         from '@mui/material/Container';
import FormControl       from '@mui/material/FormControl';
import Grid              from '@mui/material/Grid';
import URHeader          from './URHeader';
import URFooter          from './URFooter';
import {updateForm}      from '../../actions/memberAction';
import { useFileUpload } from "use-file-upload";
import store             from '../../store/index';
import URTextField       from './URTextField';
import URSelectBox       from './URSelectBox';
import Button            from '@mui/material/Button';

const theme = createTheme();

function UserRegistration(props) {

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
    photoFileData    : store.getState().photoFileData  ,
  });

  // ニックネームの入力チェック用変数
  const [nicknameerr , setNickNameErr] = useState('')

  // 所在地の入力チェック用変数
  const [locationerr , setLocationErr] = useState('')
 
  // メールアドレスの入力チェック用変数
  const [addresserr , setAddressErr] = useState('')
 
  // パスワードの入力チェック用変数
  const [passworderr , setPasswordErr] = useState('')
  
  // ファイルアップロード用変数
  // const [files, selectFiles] = useFileUpload();
  // const pushfiles = (source , file) => {
  //   console.log("pushfilesを通過")

  //   const photo        = "photoURL"      // サムネイル用の画像表示
  //   const filedata     = "photoFileData" // ファイルアップロード用画像データ一式
  //   const fileURL      = source          // サムネイル用の画像表示
  //   const fileDataInfo = file            // ファイルアップロード用画像データ一式
  //   form[photo]        = fileURL
  //   form[filedata]     = fileDataInfo
  //   const data = form
  //   setForm({
  //     ...form,
  //     photo : source,
  //   })
  //   setForm({
  //     ...form,
  //     filedata : file
  //   })
  //   store.dispatch(updateForm(data))
  //   console.log(form)
  // }
 
  // リンク先に遷移
  const history = useHistory();

  // 登録ボタンクリック時のハンドル
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

    // 所在地の入力チェック
    if(store.getState().location === "")
    {
      name = "locationErrorMS"
      value = "所在地を入力してください"
      form[name] = value
      data = form
      setLocationErr('error')
      setForm({
        ...form,
        name : value,
      });
    }else{
      name = "locationErrorMS"
      value = ""
      form[name] = value
      data = form
      setLocationErr('')
      setForm({
        ...form,
        name : value,
      });
    }

    // メールアドレスの入力チェック
    if(store.getState().address === "")
    {
      name = "addressErrorMS"
      value = "メールアドレスを入力してください"
      form[name] = value
      data = form
      setAddressErr('error')
      setForm({
        ...form,
        name : value,
      });
    }else{
      name = "addressErrorMS"
      value = ""
      form[name] = value
      data = form
      setAddressErr('')
      setForm({
        ...form,
        name : value,
      });
    }

    // パスワードの入力チェック
    if(store.getState().password1 === "")
    {
      name = "passwordErrorMS"
      value = "パスワードを入力してください"
      form[name] = value
      data = form
      setPasswordErr('error')
      setForm({
        ...form,
        name : value,
      });
    }else if(store.getState().password1 != store.getState().password2){
      name = "passwordErrorMS"
      value = "入力したパスワードが一致していません"
      form[name] = value
      data = form
      setPasswordErr('error')
      setForm({
        ...form,
        name : value,
      });

    }else if(store.getState().password1.length < 6 ){
      name = "passwordErrorMS"
      value = "パスワードは6文字以上入力してください"
      form[name] = value
      data = form
      setPasswordErr('error')
      setForm({
        ...form,
        name : value,
      });
    }else{
      name = "passwordErrorMS"
      value = ""
      form[name] = value
      data = form
      setPasswordErr('')
      setForm({
        ...form,
        name : value,
      });
    }
    store.dispatch(updateForm(data))
    console.log(data)

    // 入力内容のチェック
    if (store.getState().nicknameErrorMS == "" &&
        store.getState().locationErrorMS == "" &&
        store.getState().addressErrorMS  == "" &&
        store.getState().passwordErrorMS == "" )
    {
      console.log("OK")
      history.push("/userregistration/Review")
    }else{
      console.log("NG")
    }
  }

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
        <URHeader/>
      </Container>
        <Container maxWidth="sm">
          <br/>
          <Typography variant="h4" gutterBottom align='center'>
            アカウント情報入力
          </Typography>
          {/* <Container align='center'>
            <Avatar
              alt="preview"
              src={files?.source || store.getState().photoURL}
              padding ="1em"
              sx={{ width: 150, height: 150 }}/>
            <br/>
            <Button
              variant="outlined"
              onClick={() =>
                  selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                  console.log("Files Selected", { name, size, source, file })
                  pushfiles(source , file)
              })}>
              プロフィール画像選択
            </Button>
            <br/><br/>
          </Container> */}

          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Typography variant="h7">
              ニックネーム(公開されます)
            </Typography>
              <URTextField
                label      = "入力してください"
                name       = "displayName"
                type       = "displayName"
                error      = {nicknameerr}
                helperText = {store.getState().nicknameErrorMS}
                value      = {store.getState().displayName}
                onChange   = {handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <Typography variant="h7">
                  所在地(公開されます)
                </Typography>
                <URSelectBox
                  labelId        = "location"
                  id             = "location"
                  name           = "location"
                  type           = "location"
                  error          = {locationerr}
                  FormHelperText = {store.getState().locationErrorMS}
                  value          = {store.getState().location}
                  onChange       = {handleChange}/>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7">
                メールアドレス(公開されません)
              </Typography>
              <URTextField
                label      = "入力してください"
                name       = "address"
                type       = "address"
                error      = {addresserr}
                helperText = {store.getState().addressErrorMS}
                value      = {store.getState().address}
                onChange   = {handleChange}/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h7">
              パスワード(公開されません)
            </Typography>
              <URTextField
                label      = "入力してください"
                name       = "password1"
                type       = "password1"
                error      = {passworderr}
                helperText = {store.getState().passwordErrorMS}
                value      = {store.getState().password1}
                onChange   = {handleChange}
                />
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h7">
              パスワード(確認用)
            </Typography>
              <URTextField
                label      = "入力してください" 
                name       = "password2"
                type       = "password2"
                error      = {passworderr}
                helperText = "パスワードを再度入力してください。"
                value      = {store.getState().password2}
                onChange   = {handleChange}/>
            </Grid>
          </Grid>
          <Typography align='center'>
            <Button
              id      = "inputcheck"
              variant = "contained"
              sx={{ mt: 3, ml: 1 }}
              onClick= {clickChange}>この内容で登録する
            </Button>
          </Typography>
        </Container>
      {/* Footer */}
      <URFooter/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(UserRegistration);
