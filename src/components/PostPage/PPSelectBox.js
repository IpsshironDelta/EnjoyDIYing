import * as React  from 'react';
import InputLabel  from '@mui/material/InputLabel';
import MenuItem    from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select      from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
      <FormControl>
        <InputLabel 
          id="demo-simple-select-label"
          size="small">期間</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="期間"
            size="small"
            onChange={handleChange}>
          <MenuItem value={10}>日間</MenuItem>
          <MenuItem value={20}>週間</MenuItem>
          <MenuItem value={30}>カ月</MenuItem>
          <MenuItem value={40}>年間</MenuItem>
        </Select>
      </FormControl>
  );
}
