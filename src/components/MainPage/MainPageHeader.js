import * as React     from 'react';
import {Avatar,
        AppBar,
        Toolbar,
        Box,}         from "@mui/material"
import MainPageButton from './MainPageButton';
import EditIcon       from '@mui/icons-material/Edit';
import HomeIcon       from '@mui/icons-material/Home';
import PersonAddIcon  from '@mui/icons-material/PersonAdd';
import BugReportIcon  from '@mui/icons-material/BugReport';
import PersonIcon     from '@mui/icons-material/Person';
import LogoutIcon     from '@mui/icons-material/Logout';
import useProfile     from "../../components/hooks/useProfile"
import Header from '../Header';
import HeaderTitle    from '../HeaderTitle'

export default function PrimarySearchAppBar() {
  const profileData = useProfile()
  const profile = profileData.profile
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
              <MainPageButton
                text      ="テスト画面" 
                link      = "/message"
                size      = "large"
                variant   = "contained"
                startIcon = {<BugReportIcon/>}/>
              <MainPageButton
                text      ="投稿する" 
                link      = "/postpage"
                size      = "large"
                variant   = "contained"
                startIcon = {<EditIcon/>}/>
              <MainPageButton
                text      = "ホーム" 
                link      = "/"
                size      = "large"
                variant   = "contained"
                startIcon = {<HomeIcon/>}/>
              <MainPageButton
                text      = "プロフィール" 
                link      = "/profile"
                size      = "large"
                variant   = "contained"
                startIcon = {<PersonIcon/>}/>
              <MainPageButton
                id        = "logout"
                text      = "ログアウト" 
                link      = "/"
                size      = "large"
                variant   = "contained"
                startIcon = {<LogoutIcon/>}/>
              {profile ? 
                <Avatar src={profile ? profile.image : ""} alt="" />
                  : <MainPageButton
                    text    = "新規登録" 
                    link    = "/login"
                    size    = "large"
                    variant = "contained"
                    startIcon = {<PersonAddIcon/>}/>}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
  );
}
