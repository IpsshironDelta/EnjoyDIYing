import * as React   from 'react';
import AppBar       from '@mui/material/AppBar';
import Box          from '@mui/material/Box';
import Toolbar      from '@mui/material/Toolbar';
import MyPageButton from './MyPageButton';
import HeaderTitle  from '../HeaderTitle';
import EditIcon       from '@mui/icons-material/Edit';
import HomeIcon       from '@mui/icons-material/Home';
import PersonIcon     from '@mui/icons-material/Person';


export default function PrimarySearchAppBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={"background-color:#E64545;"}>
          <HeaderTitle
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}/>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <MyPageButton
              text    = "投稿する" 
              link    = "/post"
              size    = "large"
              variant = "contained"
              startIcon = {<EditIcon/>}/>
          <MyPageButton
            text    = "ホーム" 
            link    = "/"
            size    = "large"
            variant = "contained"
            startIcon = {<HomeIcon/>}/>
            <MyPageButton
              text    = "マイページ" 
              link    = "/mypage"
              size    = "large"
              variant = "contained"
              startIcon = {<PersonIcon/>}/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
