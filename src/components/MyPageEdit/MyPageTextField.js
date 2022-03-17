import React           from 'react';
import TextField       from '@mui/material/TextField';
import { withRouter }  from 'react-router-dom';

function MyPageEditTextField(props) {

  return (
      <TextField
        error         = {props.error}
        id            = {props.id}
        name          = {props.name}
        label         = {props.label}
        value         = {props.value}
        variant       = {props.variant}
        type          = {props.type}
        helperText    = {props.helperText}
        onChange      = {props.onChange}
        endAdornment  = {props.endAdornment}
      />
  );
}

export default withRouter(MyPageEditTextField);