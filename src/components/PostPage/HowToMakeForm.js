import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ImageUpload from './ImageUpload';
import { Button, stepContentClasses } from '@mui/material';
import { withRouter  } from "react-router-dom";
import store from '../../store/index';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { TransitionGroup } from 'react-transition-group';
import Box from '@mui/material/Box';
import { width } from '@mui/system';

const STEP =[
   '手順1',
   '手順2',
   '手順3',
   '手順4',
   '手順5',
];

function renderItem({ item, ClickDelStep }) {
  return (
    <ListItem
      secondaryAction={
        <Button
          variant="contained"
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => ClickDelStep(item)}>
          削除
        </Button>
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  );
}

function HowToMakeForm() {

  const [stepcount , setStepCount]= useState(STEP.slice(0,1));
  const [count , setCount] = useState(1);

  const ClickAddStep = ()=>{
    console.log("ClickAddStep起動")
    setCount(count + 1);
    const nextStepItem = STEP.find((i) => !stepcount.includes(i));
    if(nextStepItem){
      setStepCount((prev) => [nextStepItem,...prev]);
    }
  }

  const ClickDelStep = (item) => {
    console.log("ClickDelStep起動")
    setCount(count - 1);
    setStepCount((prev) => [...prev.filter((i) => i !== item)]);
  };

  const addStepButton = (
    <Button
      variant="contained"
      disabled={stepcount.length >= STEP.length}
      onClick={ClickAddStep}
    >
      手順を追加する
    </Button>
  );

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        作り方を入力する
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" gutterBottom>
            作品タイトル
          </Typography>
          <Typography variant="h6" gutterBottom>
            {store.getState().recipetitle}
          </Typography>

          <Typography variant="h5" gutterBottom>
            カテゴリー
          </Typography>
          <Typography variant="h6" gutterBottom>
            {store.getState().category}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
            制作費用：￥
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
        <TextField
              id="productionCost"
              fullWidth
              autoComplete="p-cost"
              variant="standard"
            />
        </Grid>

        <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
            完成サイズ
          </Typography>
        </Grid>
        <Grid item xs={12} md={1}>
          <Typography variant="h7">
            W：
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          id="outlined-number"
          type="number"
          defaultValue="Small"
          size="small"/>
        </Grid>
        <Grid item xs={12} md={1}>
          <Typography variant="h7">
            mm
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom/>
        </Grid>
        <Grid item xs={12} md={1}>
          <Typography variant="h7" gutterBottom>
            D：
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          id="outlined-number"
          type="number"
          defaultValue="Small"
          size="small"/>
        </Grid>
        <Grid item xs={12} md={1}>
          <Typography variant="h7" gutterBottom>
            mm
          </Typography>
        </Grid>
      
        <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom/>
        </Grid>
        <Grid item xs={12} md={1}>
          <Typography variant="h7" gutterBottom>
            H：
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          id="outlined-number"
          type="number"
          defaultValue="Small"
          size="small"/>
        </Grid>
        <Grid item xs={12} md={1}>
          <Typography variant="h7" gutterBottom>
            mm
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            gutterBottom>使用した材料</Typography >
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            id="material"
            fullWidth
            autoComplete="material"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            gutterBottom>使用した工具</Typography >
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            id="material"
            fullWidth
            autoComplete="material"
            variant="standard"
          />
        </Grid>
      </Grid>
        
      <Grid item xs={12} md={4}>
        {addStepButton}
      </Grid>
      <Box sx={{ 
        mt: 1,
        width : 250,
        }}>
        <TransitionGroup>
          {stepcount.map((item) => (
            <Collapse key={item}>
              {renderItem({ item, ClickDelStep })}
              <ImageUpload/>
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>
    </React.Fragment>
  );
}

export default withRouter(HowToMakeForm);