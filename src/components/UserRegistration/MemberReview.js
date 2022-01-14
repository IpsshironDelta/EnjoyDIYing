import React        from 'react';
import Typography   from '@mui/material/Typography';
import List         from '@mui/material/List';
import ListItem     from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid         from '@mui/material/Grid';
import store        from '../../store/index';

export default function Review(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        以下の内容で登録しますか？
      </Typography>
      <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>苗字</ListItemText>
            <Typography variant="body2">{store.getState().firstname}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>名前</ListItemText>
            <Typography variant="body2">{store.getState().secondname}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>メールアドレス</ListItemText>
            <Typography variant="body2">{store.getState().address}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>パスワード1</ListItemText>
            <Typography variant="body2">{store.getState().password1}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>パスワード2</ListItemText>
             <Typography variant="body2">{store.getState().password2}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>ニックネーム</ListItemText>
            <Typography variant="body2">{store.getState().nickname}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>所在地</ListItemText>
            <Typography variant="body2">{store.getState().location}</Typography>
          </ListItem>

        {/* ))} */}
      </List>
      <Grid container spacing={2}>
      </Grid>
    </React.Fragment>
  );
}