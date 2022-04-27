import React, 
      {useState,}        from "react";
import {Avatar,
        AppBar,
        Toolbar,
        Box,
        ListItemIcon,
        MenuItem,
        Menu ,}         from "@mui/material"
import MainPageButton from './MainPageButton';
import EditIcon       from '@mui/icons-material/Edit';
import HomeIcon       from '@mui/icons-material/Home';
import PersonAddIcon  from '@mui/icons-material/PersonAdd';
import BugReportIcon  from '@mui/icons-material/BugReport';
import PersonIcon     from '@mui/icons-material/Person';
import LogoutIcon     from '@mui/icons-material/Logout';
import useProfile     from "../../components/hooks/useProfile"
import HeaderTitle    from '../HeaderTitle'
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';

export default function PrimarySearchAppBar() {
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
                text      = "マイページ" 
                link      = {profile ? "/profiles/"+profile.uid : ""} 
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
                <IconButton onClick={handleClickAvatar}>
                  <Avatar src={profile ? profile.image : ""} alt="" />
                </IconButton>
                  : <MainPageButton
                    text    = "新規登録" 
                    link    = "/login"
                    size    = "large"
                    variant = "contained"
                    startIcon = {<PersonAddIcon/>}/>}
              </Box>
          </Toolbar>
        </AppBar>

        {/* アバターアイコンをクリックしたときのメニュー表示 */}
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          投稿した作品を確認する
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          マイページ
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <StarIcon fontSize="small" />
          </ListItemIcon>
          お気に入り
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          ログアウト
        </MenuItem>
      </Menu>
      </Box>
  );
}
