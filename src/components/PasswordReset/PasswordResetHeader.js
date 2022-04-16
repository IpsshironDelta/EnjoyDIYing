import * as React     from 'react';
import AppBar         from '@mui/material/AppBar';
import Box            from '@mui/material/Box';
import Toolbar        from '@mui/material/Toolbar';
import HeaderTitle    from '../HeaderTitle';
import PasswordResetButton    from './PasswordResetButton';
import FeedIcon from '@mui/icons-material/Feed';

export default function PasswordResetHeader() {
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
        <PasswordResetButton
              text      ="操作説明" 
              link      = "/operation"
              size      = "large"
              variant   = "contained"
              startIcon = {<FeedIcon/>}/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
