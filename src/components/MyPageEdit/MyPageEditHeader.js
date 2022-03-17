import * as React   from 'react';
import AppBar       from '@mui/material/AppBar';
import Box          from '@mui/material/Box';
import Toolbar      from '@mui/material/Toolbar';
import Typography   from '@mui/material/Typography';

export default function MyPageHeaderAppBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            これ、考えた人すごいね。
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
