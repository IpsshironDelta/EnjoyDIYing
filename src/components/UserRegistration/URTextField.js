import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function StateTextFields(props) {

  // const [formData, setData] = React.useState();

  // const handleChange = (event) => {
  //   event.preventDefault();
  //   setData({ ...formData, [event.target.name]: event.target.value });
  // }

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