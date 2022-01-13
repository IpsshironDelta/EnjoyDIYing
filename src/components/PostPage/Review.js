import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import store from '../../store/index';

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
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>作品タイトル</ListItemText>
            <Typography variant="body2">{store.getState().recipetitle}</Typography>
            <Typography variant="body2">{store.getState().category}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>作品カテゴリー</ListItemText>
            <Typography variant="body2">{store.getState().recipetitle}</Typography>
            <Typography variant="body2">{store.getState().category}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>制作費用</ListItemText>
            <Typography variant="body2">{store.getState().recipetitle}</Typography>
            <Typography variant="body2">{store.getState().category}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>使用した工具</ListItemText>
            <Typography variant="body2">{store.getState().recipetitle}</Typography>
            <Typography variant="body2">{store.getState().category}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>使用した材料</ListItemText>
            <Typography variant="body2">{store.getState().recipetitle}</Typography>
            <Typography variant="body2">{store.getState().category}</Typography>
          </ListItem>
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