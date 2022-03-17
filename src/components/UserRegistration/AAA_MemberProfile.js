import React,
     { useState  }     from 'react';
import Grid            from '@mui/material/Grid';
import Typography      from '@mui/material/Typography';
import { withRouter  } from "react-router-dom";
import store           from '../../store/index';
import {updateForm}    from '../../actions/memberAction';
import FormControl     from '@mui/material/FormControl';
import URTextField     from './URTextField';
import URSelectBox     from './URSelectBox';

function MemberProfile() {
  const [form , setForm] = useState({ 
    displayName      : store.getState().displayName     || '',
    location         : store.getState().location        || '',
    address          : store.getState().address         || '',
    password1        : store.getState().password1       || '',
    password2        : store.getState().password2       || '',
    nicknameErrorMS  : store.getState().nicknameErrorMS ,
    locationErrorMS  : store.getState().locationErrorMS ,
    addressErrorMS   : store.getState().addressErrorMS  ,
    passwordErrorMS  : store.getState().passwordErrorMS ,
    mypageImgURL     : store.getState().mypageImgURL    ,
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
          <URTextField
            label    ="ニックネーム(公開されます)"
            name     = "displayName"
            type     = "displayName"
            value    = {store.getState().displayName}
            onChange = {handleChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <URSelectBox
              labelId="location"
              id="location"
              label="所在地"
              name="location"
              type="location"
              value={store.getState().location}
              onChange={handleChange}/>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <URTextField
            label="メールアドレス(公開されません)"
            name = "address"
            type = "address"
            value = {store.getState().address}
            onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <URTextField
            label="パスワード(公開されません)"
            name="password1"
            type="password1"
            helperText="英数字6文字以上を入力してください"
            value={store.getState().password1}
            onChange={handleChange}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <URTextField
            label="パスワード(確認用)"            
            name="password2"
            type="password2"
            helperText="パスワードを再度入力してください。"
            value={store.getState().password2}
            onChange={handleChange}/>
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="お知らせを受け取る(仮)"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(MemberProfile);