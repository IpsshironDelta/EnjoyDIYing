import * as React  from 'react';
import Typography  from '@mui/material/Typography';
import Grid        from '@mui/material/Grid';
import store       from '../../store/index';
import TextField   from '@mui/material/TextField';
import Box         from '@mui/material/Box';
import PPSelectBox from './PPSelectBox';

export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        入力内容確認
      </Typography>
      <Typography variant="h5" gutterBottom>
        以下の内容で投稿します。
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            作品タイトル
          </Typography>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              }}>
            <TextField
              fullWidth
              id="recipetitle"
              variant="standard"
              defaultValue={store.getState().recipetitle}
              InputProps={{
                readOnly: true,
              }}/>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            カテゴリー
          </Typography>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              }}>
            <TextField
              fullWidth
              id="category"
              defaultValue={store.getState().category}
              variant="standard"
              InputProps={{
                readOnly: true,
              }}/>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            制作費用
          </Typography>
          <Typography variant="h7">
            ￥：
            <TextField
              id="productionCost"
              defaultValue={store.getState().productionCost}
              size ="small"
              variant="standard"
              InputProps={{
                readOnly: true,
              }}/>
            円
          </Typography>
          <br/><br/>
          <Typography variant="h6" gutterBottom>
            制作期間
          </Typography>
          <Typography variant="h7">
            約 ： 
            <TextField
              id="productionPeriod"
              defaultValue={store.getState().productionPeriod}
              size ="small"
              variant="standard"
              InputProps={{
                readOnly: true,
              }}/>
              <PPSelectBox/>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            完成サイズ
          </Typography>
          <Typography variant="h7">
            W ： 
            <TextField
              id="width"
              defaultValue={store.getState().width}
              size ="small"
              variant="standard"
              InputProps={{
                readOnly: true,
              }}/>
            mm
          </Typography>
          <br/><br/>
          <Typography variant="h7">
            H ： 
            <TextField
              id="height"
              defaultValue={store.getState().height}
              size ="small"
              variant="standard"
              InputProps={{
                readOnly: true,
              }}/>
            mm
          </Typography>
          <br/><br/>
          <Typography variant="h7">
            D ：
            <TextField
              id="depth"
              defaultValue={store.getState().depth}
              size ="small"
              variant="standard"
              InputProps={{
                readOnly: true,
              }}/>
             mm
          </Typography>
        </Grid>
      </Grid>



      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}