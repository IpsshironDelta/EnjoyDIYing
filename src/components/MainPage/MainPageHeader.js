import * as React     from 'react';
import AppBar         from '@mui/material/AppBar';
import Box            from '@mui/material/Box';
import Toolbar        from '@mui/material/Toolbar';
import MainPageButton from './MainPageButton';
import HeaderTitle    from '../HeaderTitle';
import EditIcon       from '@mui/icons-material/Edit';
import HomeIcon       from '@mui/icons-material/Home';
import PersonIcon     from '@mui/icons-material/Person';
import PersonAddIcon  from '@mui/icons-material/PersonAdd';

export default function PrimarySearchAppBar() {
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
              text      = "マイページ" 
              link      = "/mypage"
              size      = "large"
              variant   = "contained"
              startIcon = {<PersonIcon/>}/>
            <MainPageButton
              text    = "新規登録" 
              link    = "/login"
              size    = "large"
              variant = "contained"
              startIcon = {<PersonAddIcon/>}/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
