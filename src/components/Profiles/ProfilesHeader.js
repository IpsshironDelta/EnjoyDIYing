import * as React     from 'react';
import {Avatar,
        AppBar,
        Toolbar,
        Box,} from "@mui/material"
import ProfileButton from './ProfilesButton';
import HeaderTitle    from '../HeaderTitle';
import FeedIcon from '@mui/icons-material/Feed';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import useProfile from "../hooks/useProfile"

export default function ProfilesHeader() {
  const profileData = useProfile()
  const profile = profileData.profile
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <HeaderTitle
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}/>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <ProfileButton
              text      ="操作説明" 
              link      = "/operation"
              size      = "large"
              variant   = "contained"
              startIcon = {<FeedIcon/>}/> */}
            <ProfileButton
              text      ="ホーム" 
              link      = "/"
              size      = "large"
              variant   = "contained"
              startIcon = {<HomeIcon/>}
              sx        = {{"&:hover": {background: "#E64545"}}}/>
            {/* <ProfileButton
              id        = "logout"
              text      = "ログアウト" 
              link      = "/"
              size      = "large"
              variant   = "contained"
              startIcon = {<LogoutIcon/>}/> */}
            <Avatar src={profile ? profile.image : ""} alt="" />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
