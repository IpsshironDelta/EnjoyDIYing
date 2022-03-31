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
      color     = {props.color}
      gutterBottom>
      {props.front_text}これ、考えた人すごいね。{props.text}
    </Typography>
  );
}

HeaderTitle.propTypes = {
  children: PropTypes.node,
};

export default HeaderTitle;