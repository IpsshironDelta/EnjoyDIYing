import   React, 
      {  useEffect , 
         useState }      from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {Select ,
        Typography , } from '@mui/material';
import { collection,
        getDocs , }      from "firebase/firestore"
import { db }             from '../../firebase';

const collectionCategoryName = "category"

export default function GroupedSelect() {
  // ------セレクトボックス用------
  const [selectcategory , setSelectCategory] = useState()
  const [selectdetail , setSelectDetail] = useState()
  const [categorys, setCategorys] = useState([]);
  const categoryAry = [];
  const [detail, setDetail] = useState([]);
  const detailAry = [];

  // カテゴリーセレクトボックスの要素選択時
  const handleCategoryChange = (event) => {
    setSelectCategory(event.target.value)
    console.log(event.target.value)
    fetchDetailData(event.target.value)
  }

  // detailセレクトボックスの要素選択時
  const handleDetailChange = (event) => {
    setSelectDetail(event.target.value)
    console.log(event.target.value)
  };


  // firestoreからcategoryの取得
  const fetchCategoryData = () => {
    getDocs(collection(db, collectionCategoryName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // 重複していない要素だけを追加する
        if(!categoryAry.includes(doc.data().category)){
          categoryAry.push(
            doc.data().category
            )          
          }
        })
      }).then(()=>{
        setCategorys([...categoryAry])
        console.log("categoryAry : " , categoryAry)
      })};

  // firestoreからdetailの取得
  const fetchDetailData = (detail) => {
    console.log("detail => ", detail)
    getDocs(collection(db, collectionCategoryName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // カテゴリーで選択している要素だけを追加する
        if(doc.data().category === detail){
        detailAry.push(
          doc.data().detail
          )
        }
        })
    }).then(()=>{
      setDetail([...detailAry])
      console.log("detailAry : " , detailAry)
    })};

  useEffect(() => {
    fetchCategoryData()
  },[]);


  return (
    <div>
      {/* categoryのセレクトボックステスト */}
      <FormControl sx={{ width: '100%', height: 100, maxWidth: 350, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          category
        </Typography>
        <FormControl fullWidth height={100}>
          <InputLabel id="location-label">
            選択してください
          </InputLabel>
          {/* カテゴリー選択のセレクトボックス */}
          <Select
            labelId  = "demo-multiple-name-label"
            id       = "demo-multiple-name"
            value    = {selectcategory}
            onChange = {handleCategoryChange}
            label    = "選択してください">
            {/* MenuItemを取得 */}
            {categorys.map((categorys) => (
                <MenuItem
                key   = {categorys}
                value = {categorys}>
                {categorys}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormControl>
      {/* categoryのセレクトボックス */}

      {/* detailのセレクトボックス */}
      <FormControl sx={{ width: '100%', height: 100, maxWidth: 350, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          detail
        </Typography>
        <FormControl fullWidth height={100}>
          <InputLabel id="location-label">
            選択してください
          </InputLabel>
          {/* カテゴリー選択のセレクトボックス */}
          <Select
            labelId  = "demo-multiple-name-label"
            id       = "demo-multiple-name"
            value    = {selectdetail}
            onChange = {handleDetailChange}
            label    = "選択してください">
            {/* MenuItemを取得 */}
            {detail.map((detail) => (
                <MenuItem
                key   = {detail}
                value = {detail}>
                {detail}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormControl>
      {/* detailのセレクトボックス */}
    </div>
  );
}
