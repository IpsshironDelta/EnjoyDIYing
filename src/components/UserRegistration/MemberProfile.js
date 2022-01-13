//import * as React from 'react';
import React, { useState  } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useHistory,withRouter  } from "react-router-dom";
import store from '../../store/index';
import {updateForm} from '../../actions/memberAction';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {Select} from '@mui/material';

function MemberProfile() {
  const [form , setForm] = useState({ 
    firstname   :'苗字',
    secondname  :'名前',
    address     :'メールアドレス',
    password1   :'パスワード1',
    password2   :'パスワード2',
    nickname    :'ニックネーム',
    location    :'所在地'
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    form[name] = value;
    const data = form;
    setForm({
      ...form,
      [e.target.name] : e.target.value,
  });
  console.log("======以下handleChange内======")
  console.log("name  => ",name);
  console.log("value => ",value);
  console.log("form  => ",form);
  console.log("==============================")
  store.dispatch(updateForm(data))  
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ユーザー情報
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="苗字(公開されません)"
            name="firstname"
            type="firstname"
            onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="氏名(公開されません)"
            name="secondname"
            type="secondname"
            onChange={handleChange}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="メールアドレス(公開されません)"
            name="address"
            type="address"
            onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="パスワード(公開されません)"
            name="password1"
            type="password1"
            onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="パスワード(確認)"            
            name="password2"
            type="password2"
            onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="ニックネーム"
            name="nickname"
            type="nickname"
            onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="location-label">
                所在地
              </InputLabel>
              <Select
                labelid="location"
                id="location"
                label="所在地"
                name="location"
                type="location"
                value={form.location}
                onChange={handleChange}>
                <MenuItem value="北海道">北海道</MenuItem>
                <MenuItem value="青森県">青森県</MenuItem>
                <MenuItem value="岩手県">岩手県</MenuItem>
                <MenuItem value="宮城県">宮城県</MenuItem>
                <MenuItem value="秋田県">秋田県</MenuItem>
                <MenuItem value="山形県">山形県</MenuItem>
                <MenuItem value="福島県">福島県</MenuItem>
                <MenuItem value="茨城県">茨城県</MenuItem>
                <MenuItem value="栃木県">栃木県</MenuItem>
                <MenuItem value="群馬県">群馬県</MenuItem>
                <MenuItem value="埼玉県">埼玉県</MenuItem>
                <MenuItem value="千葉県">千葉県</MenuItem>
                <MenuItem value="東京都">東京都</MenuItem>
                <MenuItem value="神奈川県">神奈川県</MenuItem>
                <MenuItem value="新潟県">新潟県</MenuItem>
                <MenuItem value="富山県">富山県</MenuItem>
                <MenuItem value="石川県">石川県</MenuItem>
                <MenuItem value="福井県">福井県</MenuItem>
                <MenuItem value="山梨県">山梨県</MenuItem>
                <MenuItem value="長野県">長野県</MenuItem>
                <MenuItem value="岐阜県">岐阜県</MenuItem>
                <MenuItem value="静岡県">静岡県</MenuItem>
                <MenuItem value="愛知県">愛知県</MenuItem>
                <MenuItem value="三重県">三重県</MenuItem>
                <MenuItem value="滋賀県">滋賀県</MenuItem>
                <MenuItem value="京都府">京都府</MenuItem>
                <MenuItem value="大阪府">大阪府</MenuItem>
                <MenuItem value="兵庫県">兵庫県</MenuItem>
                <MenuItem value="奈良県">奈良県</MenuItem>
                <MenuItem value="和歌山県">和歌山県</MenuItem>
                <MenuItem value="鳥取県">鳥取県</MenuItem>
                <MenuItem value="島根県">島根県</MenuItem>
                <MenuItem value="岡山県">岡山県</MenuItem>
                <MenuItem value="広島県">広島県</MenuItem>
                <MenuItem value="山口県">山口県</MenuItem>
                <MenuItem value="徳島県">徳島県</MenuItem>
                <MenuItem value="香川県">香川県</MenuItem>
                <MenuItem value="愛媛県">愛媛県</MenuItem>
                <MenuItem value="高知県">高知県</MenuItem>
                <MenuItem value="福岡県">福岡県</MenuItem>
                <MenuItem value="佐賀県">佐賀県</MenuItem>
                <MenuItem value="長崎県">長崎県</MenuItem>
                <MenuItem value="熊本県">熊本県</MenuItem>
                <MenuItem value="大分県">大分県</MenuItem>
                <MenuItem value="宮崎県">宮崎県</MenuItem>
                <MenuItem value="鹿児島県">鹿児島県</MenuItem>
                <MenuItem value="沖縄県">沖縄県</MenuItem>
              </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12}>
          {/* <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="お知らせを受け取る(仮)"
          /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(MemberProfile);