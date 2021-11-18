import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyPageHeader from './MyPageHeader';
import MainFeaturedPost from './MainFeaturedPost';
import ImageListWithTitleBars from './ImageListWithTitleBars';
import { withRouter } from 'react-router';
import Footer from './Footer';
import Typography from '@mui/material/Typography';

const mainFeaturedPost = {
  title: '<ユーザー名>',
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
};

const theme = createTheme();

function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <MyPageHeader title="Myページ" />
        <main>
          <MainFeaturedPost post={mainFeaturedPost}/>
          <Typography
              component="h1"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              投稿した作品
          </Typography>
          <ImageListWithTitleBars/>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}

export default withRouter(Blog);