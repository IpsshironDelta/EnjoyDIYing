import * as React     from 'react';
import AppBar         from '@mui/material/AppBar';
import Box            from '@mui/material/Box';
import Toolbar        from '@mui/material/Toolbar';
import PostPageButton from './PostPageButton';
import HeaderTitle    from '../HeaderTitle';
import HomeIcon       from '@mui/icons-material/Home';
import PersonIcon     from '@mui/icons-material/Person';

export default function PrimarySearchAppBar() {
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <HeaderTitle
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}/>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <PostPageButton
              text    = "ホーム" 
              link    = "/"
              size    = ""
              variant = ""
              startIcon = {<HomeIcon/>}/>
            {/* <PostPageButton
              text    = "マイページ" 
              link    = "/mypage"
              size    = ""
              variant = ""
              startIcon = {<PersonIcon/>}/> */}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
