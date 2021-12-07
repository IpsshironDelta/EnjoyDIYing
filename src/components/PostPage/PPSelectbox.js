import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import app from "../../firebase";
import { collection, getDocs,getFirestore } from "firebase/firestore";

export default function BasicSelect() {
  const [categorys, setcategorys] = React.useState([]);
  const array = [];

  const db = getFirestore(app);
   const handleChange = () =>{
//     getDocs(collection(db, "category")).then((querySnapshot)=>{
//       querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.data());        
//         console.log(categorys);
//       });
//     })
// //  setcategorys([...categorys, doc.data()]);
   };

  useEffect(() => {
    getDocs(collection(db, "category")).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(categorys);
        array.push(doc.data());
      });
    }).then(()=>{
      setcategorys([...array])
    })},[]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">カテゴリー選択</InputLabel>
        <Select
          labelId="select_majoritem"
          id="select_majoritem"
          value=''
          label="カテゴリーを選択する"
        >
          {categorys.map((name,i) => (
          <MenuItem key={i} >{name.category}{name.detail}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}