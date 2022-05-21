import * as React     from 'react';
import AppBar         from '@mui/material/AppBar';
import Box            from '@mui/material/Box';
import Toolbar        from '@mui/material/Toolbar';
import HeaderTitle    from '../HeaderTitle';
import LoginButton    from './LoginButton';
import HomeIcon from '@mui/icons-material/Home';

export default function LoginHeader() {
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
        <LoginButton
              text      ="ホーム" 
              link      = "/"
              size      = "large"
              variant   = "contained"
              startIcon = {<HomeIcon/>}
              sx        = {{"&:hover": {background: "#E64545"}}}/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
