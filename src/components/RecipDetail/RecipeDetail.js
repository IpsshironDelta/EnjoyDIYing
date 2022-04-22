import * as React        from 'react';
import Button            from '@mui/material/Button';
import Card              from '@mui/material/Card';
import CardContent       from '@mui/material/CardContent';
import CardMedia         from '@mui/material/CardMedia';
import CssBaseline       from '@mui/material/CssBaseline';
import Grid              from '@mui/material/Grid';
import Stack             from '@mui/material/Stack';
import Box               from '@mui/material/Box';
import Typography        from '@mui/material/Typography';
import Container         from '@mui/material/Container';
import { createTheme, 
         ThemeProvider } from '@mui/material/styles';
import RecipeDetailHeader from "./RecipeDetailHeader"
import RecipeDetailButton from "./RecipeDetailButton"

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
});

export default function RecipDetail() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecipeDetailHeader/>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,}}>
          <Container maxWidth="md">
            {/* 作品タイトル表示欄 */}
            <Typography
              sx={{ 
                p: 1, 
                fontSize: 32 , 
                background: "#faf0e6", 
                borderRadius: 1 ,
                color:"#a0522d"}}>
              <strong>作品タイトル</strong>
            </Typography>
            <Stack
              sx={{ pt: 1 }}
              direction="row"
              spacing={2}
              justifyContent="center">
                <Typography 
                  sx={{ 
                    p: 1, 
                    fontSize: 14 , 
                    width : 600 , 
                    background: "#ffffff", 
                    borderRadius: 1 ,
                    color:"#000000"}}>
                      これを考えた人：[アバターアイコン][作成者名]
                </Typography>
                <Typography 
                  sx={{ 
                    p: 1, 
                    fontSize: 14 , 
                    width : 600 , 
                    background: "#ffffff", 
                    borderRadius: 1 ,
                    color:"#000000"}}>
                  投稿した日時：[投稿日]
                </Typography>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
          <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"/>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      手順
                    </Typography>
                    <Typography>
                      手順に関する説明
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* 作品コメント表示欄 */}
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 24 , 
                  background: "#ffffff", 
                  borderRadius: 1 ,
                  color:"#000000"}}>
                作品に関するコメント欄
              </Typography>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}