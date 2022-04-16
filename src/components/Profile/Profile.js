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
import useUser from "../../components/hooks/getuseAuth"
import {addDoc,
        collection,
        doc,
        updateDoc, } from "firebase/firestore"
import ProfileHeader from "./ProfileHeader"
import {createTheme, 
    ThemeProvider } from '@mui/material/styles';
import useProfile from "../../components/hooks/useProfile"

const theme = createTheme();

const Profile = () => {
  const [name, setName] = useState("")
  const [image, setImage] = useState()
  const firestorage = firebaseApp.firestorage
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const { user } = useUser()
  const firestore = firebaseApp.firestore
  const profileData = useProfile()
  const profile = profileData.profile

  const handleChange = (e) => {
    console.log(e.target.files)
    if (e.target.files !== null) {
        setImage(e.target.files[0])
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
                  updateDoc(userRef, { name })
              } else {
                addDoc(docRef, { name, image: "", uid })
              }}
              console.log("画像アップロード完了!")
              // 成功したアラート表示
              setSuccess(true)
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
                <Typography align="center">プロフィール編集</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Avatar
                  src={image ? URL.createObjectURL(image) : profile ? profile.image : ""}alt=""/>
                    <div>
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
                    </div>
                </Box>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="ユーザー名"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      value={name ? name : profile ? profile.name : ""}
                      onChange={e => setName(e.target.value)}/>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      {profile ? "更新" : "作成"}
                    </Button>
                    {error && (<Alert severity="error">{profile ? "更新" : "作成"}できませんでした</Alert>)}
                    {success && (<Alert severity="success"> {profile ? "更新" : "作成"}しました</Alert>)}
                </Box>
            </Paper>
        </Container>
    </ThemeProvider>
  )
}

export default Profile