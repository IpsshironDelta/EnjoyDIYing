import * as React from 'react';
import PropTypes  from 'prop-types';
import Paper      from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid       from '@mui/material/Grid';
import Link       from '@mui/material/Link';
import Box        from '@mui/material/Box';
import Avatar     from '@mui/material/Avatar';

function MainFeaturedPost(props) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h4" color="inherit" gutterBottom>
              {post.title}
              <Avatar
                alt="Remy Sharp"
                src="https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/MainPageBackImage.jpg?alt=media&token=cebffe65-94e7-4015-bf53-06ff29746431"
                sx={{ width: 120, height: 120 }}/>
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;