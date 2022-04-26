import * as React          from 'react';
import {Avatar,
        Box,
        Grid,
        Stack,
        Typography,
        Container,
        CssBaseline,}      from "@mui/material"
import { createTheme, 
         ThemeProvider }   from '@mui/material/styles';
import RecipeDetailsHeader from "./RecipeDetailsHeader"
import Footer              from '../Footer';
import ThumbUpAltIcon      from '@mui/icons-material/ThumbUpAlt';
import StarsIcon           from '@mui/icons-material/Stars';
import CardMedia           from '@mui/material/CardMedia';
import useProfile          from "../hooks/useProfile"

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
  const profileData = useProfile()
  const profile = profileData.profile

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecipeDetailsHeader/>
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
            <Box
              sx={{
                pt : 1,
                pl : 4,
                pr : 4,}}>
              <Grid container spacing={4}>
                <Grid item xs={1}>
                  <Avatar src={profile ? profile.image : ""} alt="" />
                </Grid>
                <Grid item xs={5}>
                  <Typography 
                    sx={{ 
                      p: 1, 
                      fontSize: 14 , 
                      width : 600 , 
                      color:"#000000"}}>
                    [作成者名]さん
                  </Typography>
                </Grid>
                <Grid item xs={6} align="center">
                  <Typography 
                    sx={{ 
                      p: 1, 
                      fontSize: 14 , 
                      width : 600 , 
                      color:"#000000"}}>
                    投稿した日時：[投稿日]
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
        <Box
          sx={{
            bgcolor: '#eeeeee',
            pb : 4,
            pl : 4,
            pr : 4,}}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Typography variant="body2" align='left'>
                <CardMedia
                  component = "img"
                  height    = "250"
                  image     = "https://source.unsplash.com/random"
                  alt       = "Paella dish"/>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              {/* 作品コメント表示欄 */}
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  background: "#ffffff", 
                  borderRadius: 1 ,
                  color:"#000000"}}>
                作品に関するコメント欄作品に関するコメント欄作品に関するコメント欄
                作品に関するコメント欄作品に関するコメント欄作品に関するコメント欄
                作品に関するコメント欄作品に関するコメント欄作品に関するコメント欄
              </Typography>
              <br/>
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  background: "#ffffff", 
                  borderRadius: 1 ,
                  color:"#a0522d"}}>
                かかった費用:
              </Typography>
              <br/>
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  background: "#ffffff", 
                  borderRadius: 1 ,
                  color:"#a0522d"}}>
                所要時間:
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <br/>
        <Box
          sx={{
            bgcolor: '#eeeeee',
            pl : 4,
            pr : 4,}}>
          <Grid container spacing={0} >
            <Grid item xs={2}>
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  color:"#000000"}}>
                <ThumbUpAltIcon/>いいね
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  color:"#000000"}}>
                <StarsIcon/>お気に入り
              </Typography>
            </Grid>
          </Grid>
        </Box>
        </Container>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
      </main>
    </ThemeProvider>
  );
}