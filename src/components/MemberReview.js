import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const products = [
  {
    name: '苗字',
    price: '＜苗字の入力内容＞',
  },
  {
    name: '氏名',
    price: '＜氏名の入力内容＞',
  },
  {
    name: 'メールアドレス',
    price: '＜メールアドレスの入力内容＞',
  },
  {
    name: 'パスワード',
    price: '＜パスワードの入力内容＞',
  },
  {
    name: 'ニックネーム',
    price: '＜ニックネームの入力内容＞',
  },
  {
    name: '生年月日',
    price: '＜生年月日の入力内容＞',
  },
  {
    name: '性別',
    price: '＜性別の入力内容＞',
  },
  {
    name: '所在地',
    price: '＜所在地の入力内容＞',
  },
];

// const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        以下の内容で登録しますか？
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        {/* <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem> */}
      </List>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}