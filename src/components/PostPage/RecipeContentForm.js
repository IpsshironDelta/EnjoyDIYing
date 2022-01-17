import React,
     { useEffect,
       useState }      from 'react';
import Grid            from '@mui/material/Grid';
import Typography      from '@mui/material/Typography';
import TextField       from '@mui/material/TextField';
import InputLabel      from '@mui/material/InputLabel';
import MenuItem        from '@mui/material/MenuItem';
import FormControl     from '@mui/material/FormControl';
import app             from "../../firebase";
import { collection, 
         getDocs,
        getFirestore } from "firebase/firestore";
import store           from '../../store/index';
import {updateRecipe}  from '../../actions/memberAction';
import {Select}        from '@mui/material';
import ImageUpload     from './ImageUpload';
import Paper           from '@mui/material/Paper';
import Stack           from '@mui/material/Stack';
import { styled }      from '@mui/material/styles';
import PPSelectBox     from './PPSelectBox';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AddressForm() {
  const [categorys, setcategorys] = useState([{
    recipetitle  : '作品タイトル',
    category     : 'カテゴリー',
    productionCost   : '制作費用',
    productionPeriod : '制作期間',
    width            : '横幅',
    height           : '高さ',
    depth            : '奥行',
    }]);
  const array = [];
  const db = getFirestore(app);

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    categorys[name] = value;
    const data = categorys;
    setcategorys(data);
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
      <Typography variant="h5" gutterBottom>
          DIY作品の内容を書く
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            作品タイトル
          </Typography>
        <TextField
          fullWidth
          label = "入力してください。"
          name  = "recipetitle"
          type  = "recipetitle"
          onChange={handleChange}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            作品カテゴリー
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="select-label">
              選択してください。
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

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            制作費用
          </Typography>
          <Typography variant="h7">
            ￥：
            <TextField
              id       = "productionCost"
              label    = "入力してください。"
              name     = "productionCost"
              size     = "small"
              onChange={handleChange}/>
            円
          </Typography>
          <br/><br/>
          <Typography variant="h6" gutterBottom>
            制作期間
          </Typography>
          <Typography variant="h7">
            約 ： 
            <TextField
              id       = "productionPeriod"
              type     = "number"
              name     = "productionPeriod"
              size     = "small"
              label    = "入力してください。"
              onChange ={handleChange}/>
              <PPSelectBox
               onChange={handleChange}/>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            完成サイズ
          </Typography>
          <Typography variant="h7">
            W ： 
            <TextField
              id       = "width"
              type     = "number"
              name     = "width"
              size     = "small"
              label    = "数値を入力してください。"
              onChange = {handleChange}/>
            mm
          </Typography>
          <br/><br/>
          <Typography variant="h7">
            H ： 
            <TextField
              id       = "height"
              type     = "number"
              name     = "height"
              size     = "small"
              label    = "数値を入力してください。"
              onChange = {handleChange}/>
            mm
          </Typography>
          <br/><br/>
          <Typography variant="h7">
            D ：
            <TextField
              id       = "depth"
              type     = "number"
              name     = "depth"
              size     = "small"
              label    = "数値を入力してください。"
              onChange = {handleChange}/>
             mm
          </Typography>
        </Grid>
      <br/>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 10 }}
      >
        <Item>タイトル画像<ImageUpload/></Item>
        <Item>画像2<ImageUpload/></Item>
        <Item>画像3<ImageUpload/></Item>
      </Stack>
      <br/>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 10 }}
      >
        <Item>画像4<ImageUpload/></Item>
        <Item>画像5<ImageUpload/></Item>
        <Item>画像6<ImageUpload/></Item>
      </Stack>



      </Grid>
    </React.Fragment>
  );
}