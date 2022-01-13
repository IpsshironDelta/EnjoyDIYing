import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function URTextField(props) {

  return (
      <TextField
        id={props.id}
        name={props.name}
        label={props.label}
        value={props.value}
        type={props.type}
        fullWidth
      />
  );
}