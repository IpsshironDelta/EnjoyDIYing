import React,
     { useState  }     from 'react';
import Grid            from '@mui/material/Grid';
import Typography      from '@mui/material/Typography';
import IconButton      from '@mui/material/IconButton';
import InputAdornment  from '@mui/material/InputAdornment';
import { withRouter  } from "react-router-dom";
import store           from '../../store/index';
import {updateForm}    from '../../actions/memberAction';
import FormControl     from '@mui/material/FormControl';
import URTextField     from './URTextField';
import URSelectBox     from './URSelectBox';
import Visibility      from '@mui/icons-material/Visibility';
import VisibilityOff  from '@mui/icons-material/VisibilityOff';

function MemberProfile() {
  const [form , setForm] = useState({ 
     address     : store.getState().address,
     password1   : store.getState().password1,
     password2   : store.getState().password2,
     nickname    : store.getState().nickname,
     location    : store.getState().location
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

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ユーザー情報
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <URTextField
            label="ニックネーム(公開されます)"
            name = "nickname"
            type = "nickname"
            value = {store.getState().nickname}
            onChange={handleChange}/>
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
            // endAdornment={
            //   <InputAdornment position="end">
            //     <IconButton
            //       aria-label="toggle password visibility"
            //       onClick={handleClickShowPassword}
            //       onMouseDown={handleMouseDownPassword}
            //       edge="end"
            //     >
            //       {form.showPassword ? <VisibilityOff /> : <Visibility />}
            //     </IconButton>
            //   </InputAdornment>
            // }
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