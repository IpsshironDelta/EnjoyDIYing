import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MemberStatusSelectBox from './MemberStatusSelectBox';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ユーザー情報
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="苗字(公開されません)"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="氏名(公開されません)"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="メールアドレス(公開されません)"
            fullWidth
            autoComplete="shipping address-line"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password1"
            name="password1"
            label="パスワード(公開されません)"
            fullWidth
            autoComplete="password-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password2"
            name="password2"
            label="パスワード(確認)"
            fullWidth
            autoComplete="password-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nickname"
            name="nickname"
            label="ニックネーム(公開されます)"
            fullWidth
            autoComplete="nick-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="birthday"
            name="birthday"
            label="生年月日"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            required
            id="country"
            name="country"
            label="所在地(都道府県のみ)"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          /> */}
          <MemberStatusSelectBox/>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="お知らせを受け取る(仮)"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}