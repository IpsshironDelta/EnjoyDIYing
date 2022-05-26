import React, 
      {useState,}     from "react";
import {Avatar,
        AppBar,
        Toolbar,
        Box,
        ListItemIcon,
        MenuItem,
        Menu ,}       from "@mui/material"
import QuestionButton from './QuestionButton';
import EditIcon       from '@mui/icons-material/Edit';
import HomeIcon       from '@mui/icons-material/Home';
import PersonAddIcon  from '@mui/icons-material/PersonAdd';
import LoginIcon      from '@mui/icons-material/Login';
import PersonIcon     from '@mui/icons-material/Person';
import LogoutIcon     from '@mui/icons-material/Logout';
import useProfile     from "../../components/hooks/useProfile"
import HeaderTitle    from '../HeaderTitle'
import IconButton     from '@mui/material/IconButton'
import StarIcon       from '@mui/icons-material/Star'
import BugReportIcon from '@mui/icons-material/BugReport'

export default function QuestionHeader() {
  const profileData = useProfile()
  const profile = profileData.profile
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // アバターアイコンがクリックされた時
  const handleClickAvatar = (event) =>{
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="fixed" >
          <Toolbar>
          <HeaderTitle
              variant   = "h6"
              noWrap
              component = "div"
              sx={{ display: { xs: 'none', sm: 'block' } }}/>
            <Box sx={{ flexGrow: 1 }}/>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {profile ? 
                <QuestionButton
                  text      = "ホーム" 
                  link      = "/"
                  size      = "large"
                  variant   = "contained"
                  sx        = {{"&:hover": {background: "#E64545"}}}
                  startIcon = {<HomeIcon/>}/>
              : "" }
              {profile ? 
                <QuestionButton
                  text      ="投稿する" 
                  link      = "/postpage"
                  size      = "large"
                  variant   = "contained"
                  sx        = {{"&:hover": {background: "#E64545"}}}
                  startIcon = {<EditIcon/>}/>
                : "" }
              {profile ? 
                <QuestionButton
                  text      = "マイページ" 
                  link      = {profile ? "/profiles/"+profile.uid : ""} 
                  size      = "large"
                  variant   = "contained"
                  sx        = {{"&:hover": {background: "#E64545"}}}
                  startIcon = {<PersonIcon/>}/>
                  : "" }
              {profile ? 
                <QuestionButton
                  id        = "logout"
                  text      = "ログアウト" 
                  link      = "/"
                  size      = "large"
                  variant   = "contained"
                  sx        = {{"&:hover": {background: "#E64545"}}}
                  startIcon = {<LogoutIcon/>}/>
                : <QuestionButton
                  id        = "login"
                  text      = "ログイン" 
                  link      = "/login"
                  size      = "large"
                  variant   = "contained"
                  sx        = {{"&:hover": {background: "#E64545"}}}
                  startIcon = {<LoginIcon/>}/>}
              {profile ? 
                <IconButton onClick={handleClickAvatar}>
                  <Avatar src={profile ? profile.image : ""} alt="" />
                </IconButton>
                  : <QuestionButton
                    text    = "新規登録" 
                    link    = "/signup"
                    size    = "large"
                    variant = "contained"
                    sx        = {{"&:hover": {background: "#E64545"}}}
                    startIcon = {<PersonAddIcon/>}/>}
              </Box>
          </Toolbar>
        </AppBar>
      </Box>
  )
}
