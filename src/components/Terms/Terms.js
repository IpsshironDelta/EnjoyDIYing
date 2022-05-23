import   React, 
       { useState,
         useEffect,}         from "react"
import { Box ,
         Typography,
         Container , }       from '@mui/material'
import { createTheme,
         ThemeProvider }     from '@mui/material/styles'
import { useHistory,
         withRouter }        from 'react-router'
import   TermsHeader    from './TermsHeader'
import   Footer              from '../Footer'

const theme = createTheme({
  shadows: ["none"],
  palette: {
    // ボタンのカラー設定
    primary: {
      main: '#E64545',
      contrastText: '#ffffff',
    },
    // 背景のカラー設定
    background: {
      default: '#ffffff',
    },
    // テキストのカラー設定
    text: { primary: '#000000' },
  },
})

function Terms(props) {
  
  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth>
            <TermsHeader/>
        </Container>
        <Container maxWidth = "md" >
            <Box sx={{ flexGrow: 1, m: 2, pt: 4, pb: 4 }}>
                <Container maxWidth>
                    <Typography
                        component="h1"
                        variant="h5"
                        align="left"
                        color="text.primary"
                        gutterBottom
                        sx = {{backgroundColor : "#ffffff",
                                color : "#000000",
                                padding: "1rem 2rem",
                                borderTop: "double #E64545 6px",
                                borderBottom: "double #E64545 6px",
                                pt : 5 , 
                                pb : 1 ,}}>
                        利用規約
                    </Typography>
                </Container>
            </Box>
        </Container>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(Terms);
