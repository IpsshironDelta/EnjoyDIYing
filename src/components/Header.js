import * as React     from 'react';
import {Avatar,
        AppBar,
        Toolbar,
        Box,}         from "@mui/material"
import HeaderTitle    from './HeaderTitle';
import { createMuiTheme,
  ThemeProvider } from '@mui/material/styles';

const theme = createMuiTheme({
  shadows: ["none"]
});

export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{backgroundColor:'#E64545',height: '10px' }}/>
    </ThemeProvider>
  );
}
