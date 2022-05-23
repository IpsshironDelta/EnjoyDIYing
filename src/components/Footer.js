import * as React      from 'react';
import Box             from '@mui/material/Box';
import Container       from '@mui/material/Container';
import Typography      from '@mui/material/Typography';
import HeaderTitle     from './HeaderTitle';
import { ThemeProvider, 
         createTheme } from '@mui/material/styles';
import CssBaseline     from '@mui/material/CssBaseline';
import Link            from '@mui/material/Link';
import Grid            from '@mui/material/Grid';

const textColor = "#E64545"

const footerTheme = createTheme({
  palette: {
    // テキストのカラー設定
    text: { primary: '#ffffff' },
  },
});

function Footer() {
  return (
    <ThemeProvider theme={footerTheme}>
      <CssBaseline />
      <Container maxWidth>
        <Box component="footer" sx={{backgroundColor:textColor,py:1}}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Typography variant="body2" align="center" >
                <Link
                  color="#ffffff"
                  href={`/question`}
                  style={{ textDecoration: 'none' }}>
                    <strong>よくある質問</strong>
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" align="center" >
                <Link
                  color="#ffffff"
                  href={`/inquiry`}
                  style={{ textDecoration: 'none' }}>
                    <strong>お問い合わせ</strong>
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" align="center" >
                <Link
                  color="#ffffff"
                  href={`/terms`}
                  style={{ textDecoration: 'none' }}>
                    <strong>利用規約</strong>
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" align="center" >
                <Link
                  color="#ffffff"
                  href={`/privacypolicy`}
                  style={{ textDecoration: 'none' }}>
                    <strong>プライバシーポリシー</strong>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box component="footer" sx={{backgroundColor:"#ffffff", py: 3}}>
          <Container maxWidth="lg">
            <Typography variant="body2" align="center" color = {textColor}>
              <HeaderTitle
                  variant    = "body2"
                  noWrap
                  component  = "div"
                  front_text = {'© ' + new Date().getFullYear() + ' '}
                  color     = {textColor}/>
              画像出典元:Illustration by Freepik Storyset
            </Typography>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Footer;