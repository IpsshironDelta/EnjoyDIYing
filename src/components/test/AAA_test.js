import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
 
export default function ColorButtons() {
  return (
    <Stack direction="row" spacing={2} sx={{backgroundColor:'#E64545' }}>
      <Button variant="contained" sx={"background-color:blue;"}>Blue</Button>
      <Button variant="contained" sx={"background-color:yellow;color:black;"}>Yellow</Button>
      <Button variant="contained" sx={"background-color:red;"}>Red</Button>
    </Stack>
  );
}