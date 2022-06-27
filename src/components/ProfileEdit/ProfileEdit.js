import React, { useState } from "react"
import {Avatar,
        Alert,
        Paper,
        Typography,
        CssBaseline,
        Box,
        TextField,
        Button,
        Container,}         from "@mui/material"
import {firebaseApp }       from "../../firebase"
import {ref,
        uploadBytes,
        getDownloadURL,}    from "firebase/storage"
import useUser              from "../hooks/getuseAuth"
import {addDoc,
        collection,
        doc,
        updateDoc, 
        getDocs,}        from "firebase/firestore"
import ProfileHeader        from "./ProfileEditHeader"
import {createTheme, 
        ThemeProvider }     from '@mui/material/styles';
import useProfile           from "../hooks/useProfile"
import ProfileEditSelectBox from "./ProfileEditSelectBox"
import store                from '../../store/index';
import {useHistory}         from "react-router-dom";
import ProfileEditButton    from "./ProfileEditButton"
import Footer               from '../Footer';

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
});

const collectionUserName = "users"
const collectionRecipeName = "recipe"
const collectionMessageName = "message"

const ProfileEdit = () => {
  const [name, setName] = useState(store.getState().displayName)                   // プロフィール名
  const [location , setLocation] = useState(store.getState().location)             // 所在地
  const [selfintroduction , setSelfIntroduction] = useState(store.getState().memo) // 自己紹介
  const [error, setError] = useState(false)                                        // エラー判定
  const [success, setSuccess] = useState(false)                                    // 成功判定
  const [errormessage , setErrorMessage] = useState("")                            // エラーメッセージ
  const [image, setImage] = useState()
  const firestorage = firebaseApp.firestorage
  const firestore = firebaseApp.firestore
  const profileData = useProfile()
  const profile = profileData.profile
  const { user } = useUser()
  const history = useHistory()

  const handleChange = (e) => {
    console.log(e.target.files)
    console.log("handleChange 通過")
    if (e.target.files !== null) {
        setImage(e.target.files[0])
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // アラートが出ている場合は一旦消す
    setError(false)
    setSuccess(false)
    // 入力内容が空の場合はエラーを返す
    if(name === ""){
      console.log("ユーザー名が未入力")
      setErrorMessage("ユーザー名を入力してください")
      setError(true)
      return
    }
    if(location === ""){
      console.log("所在地が未入力")
      setErrorMessage("所在地を選択してください")
      setError(true)
      return
    }
    if(selfintroduction === ""){
      console.log("自己紹介が未入力")
      setErrorMessage("自己紹介を入力してください")
      setError(true)
      return
    }

    try {
        const uid = user.uid
        const docRef = collection(firestore, collectionUserName);
 
        if(image){
            const imageRef = ref(firestorage, 'USER_PROFILE_IMG/' + uid + "/" + image.name)
            // firebase strageへ画像をアップロード
            uploadBytes(imageRef, image).then(() => {
                // getDownloadURLの中で、profileがある場合はupdateDocを指定
                // profileがない場合はaddDocを指定
                // imageがない場合も同様に指定
                getDownloadURL(imageRef).then(url => {
                  console.log(url)
                  if (profile) {
                    const userRef = doc(firestore, collectionUserName , profile?.id)
                    updateDoc(userRef, {
                      name,
                      image: url,
                      location,
                      selfintroduction,})
                    // messageドキュメント内の対象のユーザー情報を更新する
                    updateMessage(name , url)
                    // recipeドキュメント内の対象のユーザー情報を更新する
                    updateRecipe(name)
                  }else{
                    // firestoreに名前、画像URL、uidを追加する
                    addDoc(docRef, {
                        name,
                        image: url,
                        uid,
                        selfintroduction,
                        location,
                      })
                    }
                })
              })
              }else{
                // 画像を選択する
                if (profile) {
                  const userRef = doc(firestore, collectionUserName, profile?.id)
                  updateDoc(userRef, { name , location , selfintroduction})
                  // messageドキュメント内の対象のユーザー情報を更新する
                  updateMessage(name , profile.image)
                  // recipeドキュメント内の対象のユーザー情報を更新する
                  updateRecipe(name)
              } else {
                addDoc(docRef, { 
                  name, 
                  image: "", 
                  uid ,
                  selfintroduction , 
                  location})
              }}
              console.log("画像アップロード完了!")
              // 成功したアラート表示
              setSuccess(true)
              setTimeout(() => {
                history.push("/")
              },2000)
            } catch (err) {
              console.log(err)
              // 失敗したアラート表示
              setError(true)
            }
          }
  
  //  messegeドキュメント内の対象ユーザーの情報を更新する
  const updateMessage = (getName , getImage) => {
    getDocs(collection(firestore, collectionMessageName)).then((querySnapshot)=>{
      querySnapshot.forEach((docMessage) => {
        // 対象の作品(getrecipenum)と一致するコメントのみ表示する
        if(String(profile.uid) === String(docMessage.data().user.uid)){
          const messageRef = doc(firestore , collectionMessageName , docMessage.id)
          updateDoc(messageRef, { user : { 
                                    name  : getName,
                                    image : getImage,
                                    uid   : docMessage.data().user.uid,}, })
        }
      })
    })
  }

  // recipeドキュメント内の対象ユーザーの情報を更新する
  const updateRecipe = (getName) => {
    console.log("updateRecipe通過")
    getDocs(collection(firestore, collectionRecipeName)).then((querySnapshot)=>{
      querySnapshot.forEach((docRecipe) => {
        // 対象の作品(getrecipenum)と一致するコメントのみ表示する
        if(String(profile.uid) === String(docRecipe.data().image.uid)){
          const recipeRef = doc(firestore , collectionRecipeName , docRecipe.id)
          updateDoc(recipeRef, { image : { 
                                  filename : docRecipe.data().image.filename,
                                  url      : docRecipe.data().image.url,
                                  user     : getName,
                                  uid      : docRecipe.data().image.uid,}, })
        }
      })
    })
  }

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth>
            <ProfileHeader/>
        </Container>
        <Container maxWidth="sm">
        <CssBaseline />
            <Paper sx={{ m: 4, p: 4 }}>
                {error && <Alert severity="error">{errormessage}</Alert>}
                {success && (<Alert severity="success"> {profile ? "更新" : "作成"}しました</Alert>)}
                <Typography 
                  align="center" 
                  variant="h5"
                  sx = {{color : "#000000",
                         padding: "1rem 2rem",
                         borderTop: "double #E64545 6px",
                         borderBottom: "double #E64545 6px",
                         pt : 2 , 
                         pb : 2 ,}}>
                    プロフィール編集
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                  {/* アバター画像の表示 */}
                <Container align = "center">
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      src={image ? URL.createObjectURL(image) : profile ? profile.image : ""}alt=""/>
                  <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      style={{ display: "none" }}/>
                  <label htmlFor="image">
                  <Button variant="contained" color="primary" component="span">
                      画像を選択
                  </Button>
                  </label>
                </Container>
                    <Container align="left">
                      {/* ユーザー名の表示 */}
                      <Typography
                        sx = {{backgroundColor : "#ffffff",
                              color : "#000000",
                              padding: "0.2rem",
                              borderLeft : "solid #E64545 6px"}}>
                        <strong>ユーザー名</strong>
                      </Typography>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        defaultValue={name}
                        value={name ? name :  ""}
                        onChange={e => 
                          setName(e.target.value)}/>
                    </Container>
                    <br/>
                    <Container align="left">
                      {/* 所在地の表示 */}
                      <Typography
                        sx = {{backgroundColor : "#ffffff",
                              color : "#000000",
                              padding: "0.2rem",
                              borderLeft : "solid #E64545 6px"}}>
                        <strong>所在地</strong>
                      </Typography>
                      <ProfileEditSelectBox
                        margin       = "normal"
                        fullWidth
                        id           = "location"
                        name         = "location"
                        autoComplete = "location"
                        autoFocus
                        defaultValue={location}
                        value={location ? location : profile ? profile.location : ""}
                        onChange={e => setLocation(e.target.value)}/>
                      </Container>
                      <br/>
                      <Container align="left">
                        {/* 自己紹介文の表示 */}
                        <Typography
                          sx = {{backgroundColor : "#ffffff",
                                color : "#000000",
                                padding: "0.2rem",
                                borderLeft : "solid #E64545 6px"}}>
                          <strong>自己紹介</strong>
                        </Typography>
                        <TextField
                          margin="normal"
                          id        ="selfintroduction"
                          fullWidth
                          name = "selfintroduction"
                          autoComplete="selfintroduction"
                          multiline
                          defaultValue={selfintroduction}
                          rows      = {6}
                          value     = {selfintroduction ? selfintroduction : ""}
                          onChange  = {e => setSelfIntroduction(e.target.value)}/>
                      </Container>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      {profile ? "更新" : "作成"}
                    </Button>
                    <ProfileEditButton 
                      id      = "profileeditback"
                      type    = "submit"
                      link    = {profile ? "/profiles/"+profile.uid : ""} 
                      fullWidth 
                      variant = "outlined" 
                      sx={{ mt: 3, mb: 2 }}
                      text = "戻る"/>
                </Box>
            </Paper>
        </Container>
      <Footer/>
    </ThemeProvider>
  )
}

export default ProfileEdit