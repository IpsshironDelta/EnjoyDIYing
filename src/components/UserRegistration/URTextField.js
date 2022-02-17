import React           from 'react';
import TextField       from '@mui/material/TextField';
import { withRouter }  from 'react-router-dom';

function URTextField(props) {

  return (
      <TextField
        fullWidth
        id={props.id}
        name={props.name}
        label={props.label}
        value={props.value}
        type={props.type}
        helperText={props.helperText}
        onChange={props.onChange}
        endAdornment= {props.endAdornment}
      />
  );
}

export default withRouter(URTextField);