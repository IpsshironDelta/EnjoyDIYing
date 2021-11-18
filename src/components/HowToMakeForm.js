import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        作り方を入力する
      </Typography>
      <Grid container spacing={3}>
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
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="tool"
            label="使用した工具"
            fullWidth
            autoComplete="tool"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}