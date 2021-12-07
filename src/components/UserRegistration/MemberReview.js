import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        以下の内容で登録しますか？
      </Typography>
      <List disablePadding>
        {/* {products.map((product) => ( */}
          <ListItem sx={{ py: 1, px: 0 }}>
            {/* <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography> */}
            <ListItemText>苗字</ListItemText>
            <Typography variant="body2">＜苗字の入力内容＞</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>名前</ListItemText>
            <Typography variant="body2">＜苗字の入力内容＞</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>メールアドレス</ListItemText>
            <Typography variant="body2">＜苗字の入力内容＞</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>パスワード1</ListItemText>
            <Typography variant="body2">＜苗字の入力内容＞</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>パスワード2</ListItemText>
            <Typography variant="body2">＜苗字の入力内容＞</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>ニックネーム</ListItemText>
            <Typography variant="body2">＜苗字の入力内容＞</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>所在地</ListItemText>
            <Typography variant="body2">＜苗字の入力内容＞</Typography>
          </ListItem>

        {/* ))} */}
      </List>
      <Grid container spacing={2}>
      </Grid>
    </React.Fragment>
  );
}