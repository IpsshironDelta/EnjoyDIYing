//import * as React from 'react';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MemberStatusSelectBox from './URSelectBox';
import { useHistory,withRouter  } from "react-router-dom";

function AddressForm() {
  const history = useHistory();
  const [text , setCount] = useState(0);
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
    setForm({
        ...form,
        [e.target.name]:e.target.value,
    });
    console.log("handleChangeのform => ",form);
  };

  const handleClick=()=>{
    history.push({
      pathname: "/secondpage",
      state: { 
        inputFirstName  : form.firstname,
        inputSecondName : form.secondname,
        inputAddress    : form.address,
        inputPassWord1  : form.password1,
        inputPassWord2  : form.password2,
        inputNickName   : form.nickname,
        inputLocation   : form.location
      }
    })
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ユーザー情報
      </Typography>
        <p>苗字:{form.firstname}</p>
        <p>名前:{form.secondname}</p>
        <p>メールアドレス:{form.address}</p>
        <p>パスワード1:{form.password1}</p>
        <p>パスワード2:{form.password2}</p>
        <p>ニックネーム:{form.nickname}</p>
        <p>所在地:{form.location}</p>
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
          <MemberStatusSelectBox
            name="location"
            type="location"/>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="お知らせを受け取る(仮)"
          />
        </Grid>
        <button onClick={handleClick}>画面遷移</button>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(AddressForm);