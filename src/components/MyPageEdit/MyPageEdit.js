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
import { getStorage ,
         deleteObject ,
         ref as sRef, 
         uploadBytesResumable, 
         getDownloadURL, 
         ref}   from "firebase/storage";
import { getAuth, 
          updateProfile}    from "firebase/auth";

//////////
// 定数 //
//////////
const strPhotoURL          = "photoURL"
const strPhotoFileData     = "photoFileData"
const strPhotoFileDataBuff = "photoFileDataBuff"
const strMyPage            = "/mypage"
const strNicknameErrorMS   = "nicknameErrorMS"

const theme = createTheme();  

const MyPageEdit = (props) => {
  const storage = getStorage(app)
  const auth = getAuth(app)
      
  // ファイルアップロード用変数
  const [files, selectFiles] = useFileUpload();
  
  // ニックネームの入力チェック用変数
  const [nicknameerr , setNickNameErr] = useState('')

  const [form , setForm] = useState({ 
    displayName      : store.getState().displayName       || '',
    location         : store.getState().location          || '',
    nicknameErrorMS  : store.getState().nicknameErrorMS   || '',
    locationErrorMS  : store.getState().locationErrorMS   || '',
    addressErrorMS   : store.getState().addressErrorMS    || '',
    passwordErrorMS  : store.getState().passwordErrorMS   || '',
    photoFileData    : store.getState().photoFileData     || '',
    photoFileDataBuff: store.getState().photoFileDataBuff || '',
    photoURL         : auth.currentUser.photoURL          ,
    phoneNumber      : store.getState().phoneNumber       ,
  });
  // リンク先に遷移
  const history = useHistory();

  // 日付、時間を取得する
  const getDateTime = () =>{
    console.log("getDateTime通過")
    let d = new Date();

    let year  = d.getFullYear()
    let month = d.getMonth() + 1
    let day   = d.getDate()
    let hour  = d.getHours()
    let minute = d.getMinutes();
    let second = d.getSeconds();
    let millisecond = d.getMilliseconds();
    let result = "" + year + month + day + hour + minute + second + millisecond
    console.log("result : ",result)
    return result
  }

  // formの内容を入替(更新)する
  const pushfiles = (orgFile , refFile , orgDataInfo , refDataInfo) => {
    console.log("pushfilesを通過")
    const photo        = orgFile     // サムネイル用の画像表示
    const filedata     = refFile     // ファイルアップロード用画像データ一式
    const fileURL      = orgDataInfo // サムネイル用の画像表示
    const fileDataInfo = refDataInfo // ファイルアップロード用画像データ一式
    form[photo]        = fileURL
    form[filedata]     = fileDataInfo
    const data = form
    setForm({
      ...form,
      photo : orgDataInfo,
    })
    setForm({
      ...form,
      filedata : refDataInfo,
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
    if(store.getState().displayName === ""){
        name = "nicknameErrorMS"
        value = "ニックネームを入力してください"
        form[name] = value
        data = form
        setNickNameErr('error')
        setForm({
          ...form,
          name : value,
        })
        return
      }else{
        name = strNicknameErrorMS
        value = ""
        form[name] = value
        data = form
        setNickNameErr('')
        setForm({
          ...form,
          name : value,
        })
      }
      store.dispatch(updateForm(data))
      console.log(data)

      // 画像変更のチェック
      // 画像が変更された場合は、変更前の画像をFirebaseから削除し、
      // 変更後の画像をFirebaseへアップロード
    if (form.photoFileDataBuff){
      // ニックネーム(ユーザー名)と画像URL更新
      console.log("画像が変更されています")

      // 初回変更時の場合は”form.photoFileData”が空白のため
      if (!form.photoFileData){
        console.log("変更前画像のデータなし")
        console.log("何も削除しない")
        }else{
        console.log("変更前の画像データあり")
        // 変更前の画像を削除
        DelImage(store.getState().photoFileData) // 画像を削除
      }
      
      // 変更後の画像をアップロード
      uploadImage(store.getState().photoFileDataBuff) //画像をアップロード
      
      // photoFileData,photoFileDataBuffの値を更新
      pushfiles(strPhotoFileData     , 
                strPhotoFileDataBuff , 
                form.photoFileDataBuff ,
                "")
    }else{
      console.log("画像が変更されていないので何もしない")
      // photoFileDataBuffの値を削除
      pushfiles(strPhotoFileData     , 
                strPhotoFileDataBuff , 
                form.photoFileData  ,
                "")
      history.push(strMyPage)
    }
  };
  
  // 画像削除処理
  const DelImage = (file) =>{
    if (!file)return
    const desertRef = ref(storage, `files/${file.name}`);
    console.log("deserRef =>",desertRef)
    // Firebaseから指定の画像を削除
    deleteObject(desertRef).then(() => {
      // 削除成功
      console.log(file.name," をFirebaseから削除しました")
    }).catch((error) => {
      // 削除失敗
      console.log(file.name," の削除に失敗しました。")
    });
  }


  // 画像アップロード処理
  const uploadImage = (file) => { 
    if (!file) return
    const storageRef = sRef(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',(snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case 'paused':
            console.log('Upload is paused');
            break;
        case 'running':
            console.log('Upload is running');
            break;
        default:
            break
        }},
        (error) => {
            console.log("アップロードできませんでした。")
            console.log(error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(file.name," の画像アップロード完了")
                console.log('File available at', downloadURL);
                // ニックネーム(ユーザー名)と画像URL更新
                updateProfile(auth.currentUser ,{
                    displayName : store.getState().displayName,
                    photoURL    : downloadURL,
                    }).then(() => {
                        console.log("更新完了")
                        console.log("displayName => ", store.getState().displayName)
                        console.log("photoURL    => ", auth.currentUser.photoURL)
                        console.log("address     => ", store.getState().address)
                        console.log("password    => ", store.getState().password1)
                        history.push(strMyPage)
                    }).catch((error) => {
                        console.log("更新失敗")
                    })
                });
            });
        }

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
          src={files?.source || auth.currentUser.photoURL}
          padding ="1em"
          sx={{ width: 150, height: 150 }}/>
        <br/>
        <Button
            variant="contained"
            onClick={() =>
                selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                console.log("Files Selected", { name, size, source, file })
                pushfiles(strPhotoURL          ,
                          strPhotoFileDataBuff , 
                          source               ,
                          file)
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