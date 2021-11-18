import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyPageHeader from './MyPageHeader';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import { withRouter } from 'react-router';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const mainFeaturedPost = {
  title: '<ユーザー名>',
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
};

const featuredPosts = [
  {
    title: '作品タイトル',
    date: '投稿日時',
    description:
      '投稿内容詳細',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: '作品タイトル',
    date: '投稿日時',
    description:
      '投稿内容詳細',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
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
              variant="h3"
              align="left"
              color="text.primary"
              gutterBottom
            >
              投稿した作品
          </Typography>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post}/>
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Sidebar
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
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