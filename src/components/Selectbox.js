import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import app from "../firebase";
import { collection, getDocs,getFirestore } from "firebase/firestore";
import { Details } from '@mui/icons-material';

export default function BasicSelect() {
  const [categorys, setcategorys] = React.useState([]);
//  const array = [];

  const db = getFirestore(app);
  const handleChange = () =>{
    getDocs(collection(db, "category")).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());        
        console.log(categorys);
      });
    })
//  setcategorys([...categorys, doc.data()]);
  };

  useEffect(() => {
    getDocs(collection(db, "category")).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        console.log(categorys);
      });
    })
//  setcategorys([...categorys, doc.data()]);
  },[]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">カテゴリー選択</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categorys}
          label="カテゴリーを選択する"
//          onChange={handleChange}
        >
          {categorys.map((name) => (
          <MenuItem onChange={handleChange}>{name}</MenuItem>
          ))}
          <MenuItem value={2}>シャーペン</MenuItem>
          <MenuItem value={3}>ボールペン</MenuItem>
          <MenuItem value={4}>えのぐ</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}