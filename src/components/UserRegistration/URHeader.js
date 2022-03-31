import * as React  from 'react';
import AppBar      from '@mui/material/AppBar';
import Box         from '@mui/material/Box';
import Toolbar     from '@mui/material/Toolbar';
import URButton    from './URButton';
import HeaderTitle from '../HeaderTitle';
import HomeIcon    from '@mui/icons-material/Home';

export default function URHeader() {

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
            <URButton
              text    = "ホーム" 
              link    = "/"
              size    = "large"
              variant = "contained"
              startIcon = {<HomeIcon/>}/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
