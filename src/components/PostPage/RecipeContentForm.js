import React, { useEffect,useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import app from "../../firebase";
import { collection, getDocs,getFirestore } from "firebase/firestore";
import store from '../../store/index';
import {updateRecipe} from '../../actions/memberAction';
import {Select} from '@mui/material';

export default function AddressForm() {
    const [categorys, setcategorys] = useState([{
        recipetitle  : 'レシピタイトル',
        category     : 'カテゴリー'
    }]);
    const array = [];
    const db = getFirestore(app);
  
    const handleChange = (e) =>{
      const name = e.target.name;
      const value = e.target.value;
      categorys[name] = value;
      const data = categorys;
      setcategorys(data);
    //   setcategorys({
    //     ...categorys,
    //     [e.target.name]:e.target.value,
    // });
    store.dispatch(updateRecipe(data))
    console.log("======以下handleChange内======")
    console.log("e => ",name);
    console.log("value => ",value);
    console.log("handleChangeのdata => ",data);
    console.log("==============================")
  };
  
    useEffect(() => {
      getDocs(collection(db, "category")).then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          array.push(doc.data());
        });
      }).then(()=>{
        setcategorys([...array])
      })},[]);
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
            DIYレシピの内容を書く
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <TextField
                label = "レシピタイトル"
                name  = "recipetitle"
                type  = "recipetitle"
                onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            {/* <PPSelectbox/> */}
                <FormControl fullWidth>
                    <InputLabel id="select-label">
                        カテゴリー選択
                    </InputLabel>
                    <Select
                        labelid = "category"
                        id      = "category"
                        label   = "カテゴリー"
                        name    = "category"
                        type    = "category"
                        value={categorys.category}
                        onChange={handleChange}>
                        {categorys.map((name,i) => (
                        <MenuItem key={i}>
                            {name.category}{name.detail}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        </React.Fragment>
    );
}