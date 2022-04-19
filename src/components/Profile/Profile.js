import React, { useState } from "react"
import {Avatar,
        Paper,
        Typography,
        CssBaseline,
        Box,
        TextField,
        Button,
        Container,} from "@mui/material"
import { useHistory}    from 'react-router';
import ProfileHeader from "./ProfileHeader"
import {createTheme, 
    ThemeProvider } from '@mui/material/styles';
import useProfile from "../../components/hooks/useProfile"
import store                from '../../store/index';

const theme = createTheme();

const Profile = () => {
  const [name, setName] = useState("")
  const [location , setLocation] = useState("")
  const [selfintroduction , setSelfIntroduction] = useState("")
  const [image, setImage] = useState()
  const profileData = useProfile()
  const profile = profileData.profile
  const history = useHistory()
  const [form , setForm] = useState({
    displayName : store.getState().displayName || name,
    location    : store.getState().location    || location,
    memo        : store.getState().memo        || selfintroduction,
  })
  console.log("displayName => " , store.getState().displayName)
  console.log("location => " , store.getState().location)
  console.log("memo => " , store.getState().memo)
  console.log(store.getState())

  const handleSubmit = (event) => {
    store.getState().displayName = profile.name
    store.getState().location = profile.location
    store.getState().memo = profile.selfintroduction
    history.push("/profile/edit")
  }

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth>
            <ProfileHeader/>
        </Container>
        <Container maxWidth="sm">
        <CssBaseline />
            <Paper sx={{ m: 4, p: 4 }}>
                <Typography align="center" variant="h5">
                  {store.getState().displayName} さん<br/>
                  のプロフィール</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                <Container align = "center">
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      src={image ? URL.createObjectURL(image) : profile ? profile.image : ""}alt=""/>
                  <input
                      id     = "image"
                      type   = "file"
                      accept = "image/*"
                      style  = {{ display: "none" }}/>
                </Container>
                    <Container align="left">
                      <Typography >ユーザー名</Typography>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id           = "name"
                        name         = "name"
                        autoComplete = "name"
                        autoFocus
                        defaultValue = {name}
                        value        = {name ? name : profile ? profile.name : ""}
                        InputProps   = {{readOnly: true,}}
                        variant      = "standard"/>
                    </Container>
                    <br/>
                    <Container align="left">
                      <Typography>所在地</Typography>
                      <TextField
                        margin       = "normal"
                        fullWidth
                        id           = "location"
                        name         = "location"
                        autoComplete = "location"
                        autoFocus
                        defaultValue = {location}
                        value        = {location ? location : profile ? profile.location : ""}
                        InputProps   = {{readOnly: true,}}
                        variant      = "standard"/>
                      </Container>
                      <br/>
                      <Container align="left">
                        <Typography>自己紹介</Typography>
                        <TextField
                          margin       = "normal"
                          id           = "selfintroduction"
                          fullWidth
                          name         = "selfintroduction"
                          autoComplete = "selfintroduction"
                          multiline
                          defaultValue = {selfintroduction}
                          rows         = {6}
                          value        = {selfintroduction ? selfintroduction : profile ? profile.selfintroduction : "よろしくお願いします。"}
                          InputProps   = {{readOnly: true,}}
                          variant      = "standard"/>
                      </Container>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      編集する
                    </Button>
                </Box>
            </Paper>
        </Container>
    </ThemeProvider>
  )
}

export default Profile