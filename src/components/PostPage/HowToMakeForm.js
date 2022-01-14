import React, 
      { useState }     from 'react';
import Typography      from '@mui/material/Typography';
import Grid            from '@mui/material/Grid';
import TextField       from '@mui/material/TextField';
import ImageUpload     from './ImageUpload';
import { withRouter  } from "react-router-dom";
import store           from '../../store/index';
import Paper           from '@mui/material/Paper';
import Stack           from '@mui/material/Stack';
import { styled }      from '@mui/material/styles';
import Box             from '@mui/material/Box';
import {updateRecipe}  from '../../actions/memberAction';
import PPSelectBox     from './PPSelectBox';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function HowToMakeForm() {

  const [detailInfo , setdetailinfos] = useState([{
    recipetitle      : store.getState().recipetitle,
    category         : store.getState().category,
    productionCost   : '制作費用',
    productionPeriod : '制作期間',
    width            : '横幅',
    height           : '高さ',
    depth            : '奥行',
  }]);

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    detailInfo[name] = value;
    const data = detailInfo;
    setdetailinfos(data);
    store.dispatch(updateRecipe(data))
    console.log("======以下handleChange内======")
    console.log("e => ",name);
    console.log("value => ",value);
    console.log("handleChangeのdata => ",data);
    console.log("==============================")
  };

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        詳細を入力する
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
              id       = "recipetitle"
              name     = "recipetitle"
              variant  = "standard"
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
              id       = "category"
              variant  = "standard"
              name     = "category"
              defaultValue={store.getState().category}
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
              id       = "productionCost"
              label    = "入力してください。"
              name     = "productionCost"
              size     = "small"
              onChange={handleChange}/>
            円
          </Typography>
          <br/><br/>
          <Typography variant="h6" gutterBottom>
            制作期間
          </Typography>
          <Typography variant="h7">
            約 ： 
            <TextField
              id       = "productionPeriod"
              type     = "number"
              name     = "productionPeriod"
              size     = "small"
              label    = "入力してください。"
              onChange ={handleChange}/>
              <PPSelectBox
               onChange={handleChange}/>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            完成サイズ
          </Typography>
          <Typography variant="h7">
            W ： 
            <TextField
              id       = "width"
              type     = "number"
              name     = "width"
              size     = "small"
              label    = "数値を入力してください。"
              onChange = {handleChange}/>
            mm
          </Typography>
          <br/><br/>
          <Typography variant="h7">
            H ： 
            <TextField
              id       = "height"
              type     = "number"
              name     = "height"
              size     = "small"
              label    = "数値を入力してください。"
              onChange = {handleChange}/>
            mm
          </Typography>
          <br/><br/>
          <Typography variant="h7">
            D ：
            <TextField
              id       = "depth"
              type     = "number"
              name     = "depth"
              size     = "small"
              label    = "数値を入力してください。"
              onChange = {handleChange}/>
             mm
          </Typography>
        </Grid>
      </Grid>
      <br/>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 10 }}
      >
        <Item>タイトル画像<ImageUpload/></Item>
        <Item>画像2<ImageUpload/></Item>
        <Item>画像3<ImageUpload/></Item>
      </Stack>
      <br/>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 10 }}
      >
        <Item>画像4<ImageUpload/></Item>
        <Item>画像5<ImageUpload/></Item>
        <Item>画像6<ImageUpload/></Item>
      </Stack>

    </React.Fragment>
  );
}

export default withRouter(HowToMakeForm);