import * as React from 'react';
import PropTypes  from 'prop-types';
import Typography from '@mui/material/Typography';

function HeaderTitle(props) {
  return (
    <Typography 
      component = {props.component}
      variant   = {props.variant} 
      sx        = {props.sx}
      noWrap    = {props.noWrap}
      gutterBottom>
      タイトル考案中。。{props.text}
    </Typography>
  );
}

HeaderTitle.propTypes = {
  children: PropTypes.node,
};

export default HeaderTitle;