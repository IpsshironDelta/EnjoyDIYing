import * as React   from 'react';
import AppBar       from '@mui/material/AppBar';
import Box          from '@mui/material/Box';
import Toolbar      from '@mui/material/Toolbar';
import HeaderTitle from '../HeaderTitle';

export default function MyPageHeaderAppBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <HeaderTitle
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
