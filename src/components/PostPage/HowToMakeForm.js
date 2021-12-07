import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ImageUpload from './ImageUpload';
import { Button } from '@mui/material';
import { withRouter  } from "react-router-dom";


function HowToMakeForm() {

  const [count , setCount] = useState(1);
  const Clickhandle=()=>{
    setCount(count + 1);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        作り方を入力する
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="productionCost"
            label="制作費用：￥"
            fullWidth
            autoComplete="p-cost"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="point"
            label="ポイント"
            fullWidth
            autoComplete="point"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="utilizationPlace"
            label="活用場所"
            fullWidth
            autoComplete="u-place"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="material"
            label="使用した材料"
            fullWidth
            autoComplete="material"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="tool"
            label="使用した工具"
            fullWidth
            autoComplete="tool"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}md={6}>
          <p>手順{count}</p>
          <ImageUpload/>
        </Grid>
      </Grid>
      <Grid 
        container
        direction="column"
        justify="center">
        <Button variant="contained"
          onClick={Clickhandle}>手順を追加する</Button>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(HowToMakeForm);