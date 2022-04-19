import React, { useState } from "react"
import {Avatar,
        Alert,
        Paper,
        Typography,
        CssBaseline,
        Box,
        TextField,
        Button,
        Container,} from "@mui/material"
import {firebaseApp } from "../../firebase"
import {ref,
        uploadBytes,
        getDownloadURL,} from "firebase/storage"
import useUser from "../hooks/getuseAuth"
import {addDoc,
        collection,
        doc,
        updateDoc, } from "firebase/firestore"
import ProfileHeader from "./ProfileEditHeader"
import {createTheme, 
        ThemeProvider } from '@mui/material/styles';
import useProfile from "../hooks/useProfile"
import ProfileEditSelectBox from "./ProfileEditSelectBox"
import store                from '../../store/index';
import {useHistory} from "react-router-dom";
import ProfileEditButton from "./ProfileEditButton"


const theme = createTheme();

const ProfileEdit = () => {
  const [name, setName] = useState(store.getState().displayName)
  const [location , setLocation] = useState(store.getState().location)
  const [selfintroduction , setSelfIntroduction] = useState(store.getState().memo)
  const [image, setImage] = useState()
  const firestorage = firebaseApp.firestorage
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const { user } = useUser()
  const firestore = firebaseApp.firestore
  const profileData = useProfile()
  const profile = profileData.profile
  const history = useHistory()

  const handleChange = (e) => {
    console.log(e.target.files)
    if (e.target.files !== null) {
        setImage(e.target.files[0])
        console.log(e.target.files[0])
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // アラートが出ている場合は一旦消す
    setError(false)
    setSuccess(false)
    try {
        const uid = user.uid
        const docRef = collection(firestore, "users");
 
        if(image){
            const imageRef = ref(firestorage, 'USER_PROFILE_IMG/' + image.name)
            // firebase strageへ画像をアップロード
            uploadBytes(imageRef, image).then(() => {
                // getDownloadURLの中で、profileがある場合はupdateDocを指定
                // profileがない場合はaddDocを指定
                // imageがない場合も同様に指定
                getDownloadURL(imageRef).then(url => {
                  console.log(url)
                  if (profile) {
                    const userRef = doc(firestore, "users", profile?.id)
                    console.log("★")
                    updateDoc(userRef, {
                      name,
                      image: url,})
                  }else{
                    // firestoreに名前、画像URL、uidを追加する
                    addDoc(docRef, {
                        name,
                        image: url,
                        uid,
                      })
                    }
                })
              })
              }else{
                if (profile) {
                  const userRef = doc(firestore, "users", profile?.id)
                  console.log("koko")
                  updateDoc(userRef, { name })
                  updateDoc(userRef, { location })
                  updateDoc(userRef, { selfintroduction })
              } else {
                addDoc(docRef, { name, image: "", uid })
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

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth>
            <ProfileHeader/>
        </Container>
        <Container maxWidth="sm">
        <CssBaseline />
            <Paper sx={{ m: 4, p: 4 }}>
                <Typography align="center" variant="h5">プロフィール編集</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
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
                      <Typography >ユーザー名</Typography>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        defaultValue={name}
                        value={name ? name : profile ? profile.name : ""}
                        onChange={e => 
                          setName(e.target.value)}/>
                    </Container>
                    <br/>
                    <Container align="left">
                      <Typography>所在地</Typography>
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
                        <Typography>自己紹介</Typography>
                        <TextField
                          margin="normal"
                          id        ="selfintroduction"
                          fullWidth
                          name = "selfintroduction"
                          autoComplete="selfintroduction"
                          multiline
                          defaultValue={selfintroduction}
                          rows      = {6}
                          value     = {selfintroduction ? selfintroduction : profile ? profile.selfintroduction : "よろしくお願いします。"}
                          onChange  = {e => setSelfIntroduction(e.target.value)}/>
                      </Container>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      {profile ? "更新" : "作成"}
                    </Button>
                    <ProfileEditButton 
                      id      = "profileeditback"
                      type    = "submit"
                      link    = "/profile"
                      fullWidth 
                      variant = "outlined" 
                      sx={{ mt: 3, mb: 2 }}
                      text = "戻る"/>
                    {error && (<Alert severity="error">{profile ? "更新" : "作成"}できませんでした</Alert>)}
                    {success && (<Alert severity="success"> {profile ? "更新" : "作成"}しました</Alert>)}
                </Box>
            </Paper>
        </Container>
    </ThemeProvider>
  )
}

export default ProfileEdit