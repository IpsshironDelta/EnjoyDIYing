import * as React     from 'react';
import {Avatar,
        AppBar,
        Toolbar,
        Box,}         from "@mui/material"
import MainPageButton from './MainPageButton';
import HeaderTitle    from '../HeaderTitle';
import EditIcon       from '@mui/icons-material/Edit';
import HomeIcon       from '@mui/icons-material/Home';
import PersonAddIcon  from '@mui/icons-material/PersonAdd';
import BugReportIcon  from '@mui/icons-material/BugReport';
import PersonIcon     from '@mui/icons-material/Person';
import LogoutIcon     from '@mui/icons-material/Logout';
import useProfile     from "../../components/hooks/useProfile"

export default function PrimarySearchAppBar() {
  const profileData = useProfile()
  const profile = profileData.profile
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="fixed">
        <Toolbar>
          <HeaderTitle
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}/>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MainPageButton
              text      ="テスト画面" 
              link      = "/test"
              size      = "large"
              variant   = "contained"
              startIcon = {<BugReportIcon/>}/>
            <MainPageButton
              text      ="投稿する" 
              link      = "/post"
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
              text      = "プロフィール編集" 
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
