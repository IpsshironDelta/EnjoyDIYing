import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const products = [
  {
    name: '作品タイトル',
    price: '入力した作品タイトルを表示',
  },
  {
    name: '作品カテゴリー',
    price: '選択した作品カテゴリーを表示',
  },
  {
    name: '制作費用',
    price: '入力した作品費用を表示',
  },
  {
    name: '使用した工具',
    price: '入力した工具を表示',
  },
  { name: '使用した材料', 
    price: '入力した材料を表示' },
];


export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        入力内容確認
      </Typography>
      <Typography variant="h6" gutterBottom>
        以下の内容で投稿します。
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}