import React, { useState } from "react"
import {Avatar,
        Paper,
        Typography,
        CssBaseline,
        Box,
        TextField,
        Button,
        Container,
        Tabs ,
        Tab , } from "@mui/material"
import { useHistory}    from 'react-router';
import ProfileHeader from "./ProfileHeader"
import {createTheme, 
    ThemeProvider } from '@mui/material/styles';
import useProfile from "../../components/hooks/useProfile"
import store                from '../../store/index';
import ProfileImageList from "./ProfileImageList"
import { firebaseApp }   from "../../firebase";

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

// タブパネルの関数
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const [name, setName] = useState("")
  const [location , setLocation] = useState("")
  const [selfintroduction , setSelfIntroduction] = useState("")
  const [image, setImage] = useState()
  const profileData = useProfile()
  const profile = profileData.profile
  const history = useHistory()
  
  const handleSubmit = (event) => {
    store.getState().displayName = profile.name
    store.getState().location = profile.location
    store.getState().memo = profile.selfintroduction
    history.push("/profile/edit")
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth>
            <ProfileHeader/>
        </Container>
        <Container maxWidth="sm">
        <CssBaseline />
        {/* タブの文言 */}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="プロフィール情報" {...a11yProps(0)} />
                <Tab label="投稿した作品" {...a11yProps(1)} />
                <Tab label="お気に入り" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {/* プロフィールタブの中身表示 */}
              <Paper sx={{ m: 1, p: 1 }}>
                  <Typography align="center" variant="h5" >
                    {name ? name : profile ? profile.name : ""} さん<br/>
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
                        プロフィールを編集する
                      </Button>
                  </Box>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* 投稿した作品の中身表示 */}
              <Paper sx={{ m: 1, p: 1 }}>
                <Typography align="center" variant="h5">
                  {name ? name : profile ? profile.name : ""} さん<br/>
                  の投稿した作品
                </Typography>
                <ProfileImageList/>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={2}>
              {/* お気に入りの中身表示 */}
              <Paper sx={{ m: 1, p: 1 }}>
                  <Typography align="center" variant="h5">
                  {name ? name : profile ? profile.name : ""} さん<br/>
                    がお気に入りした作品</Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      プロフィールを編集する
                    </Button>
                  </Box>
              </Paper>
            </TabPanel>
          </Box>
        </Container>
    </ThemeProvider>
  )
}

export default Profile