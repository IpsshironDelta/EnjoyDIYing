import React ,
      { useEffect,
        useState,
        useRef , } from "react";
import { db }       from '../../firebase';
import { collection,
         getDocs ,}  from 'firebase/firestore';
import { Typography , 
         Box ,
         Grid,
         createTheme , 
         ThemeProvider ,} from "@mui/material"
import { format ,
         formatDistance,  } from "date-fns"
import { ja } from "date-fns/locale"
import useProfile from "../hooks/useProfile"
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const collectionName = "recipe"
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const theme = createTheme()

export default function MainPageImageList() {
  const [recipe, setMessage] = useState([]);
  const profileData = useProfile()
  const profile = profileData.profile
  const bottomRef = useRef(null)
  const array = [];

  // タイムスタンプ
  const time = (date) => {
    let timestamp = formatDistance(new Date(), date.toDate(), {
      locale: ja,
    })
    if (timestamp.indexOf("未満") !== -1) {
      return (timestamp = "たった今")
    } else if (
      timestamp.indexOf("か月") !== -1 ||
      timestamp.indexOf("年") !== -1
    ) {
      return (timestamp = format(date.toDate(), "yyyy年M月d日", {
        locale: ja,
      }))
    } else {
      return (timestamp = timestamp + "前")
    }
  }

  const fetchUsersData = () => {
    getDocs(collection(db, collectionName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        console.log(doc.id,doc.data())
        console.log(doc.data().text)
        console.log(format(doc.data().createdAt.toDate(), "yyyy年MM月dd日hh:mm"))
        array.push({
          id : doc.id,
          ...doc.data()
        })})
    }).then(()=>{
      setMessage([...array])
    })};

  useEffect(() => {
    fetchUsersData()
  },[]);


  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        {recipe ? (
          recipe.map((recipe) => (
            <Box 
              key={recipe.id} 
              sx={{
                display: "flex",
                my: 2,
                gap: 2,
                flexGrow: 1, m: 2,}}>
              <Box>
                <img src={recipe.image.url ? recipe.image.url : ""} width = "200px" alt="" />
              </Box>
              <Box sx={{ ml: 2 }}>
                <Typography sx={{ fontSize: 22 ,color:"#000000"}}>
                  <strong>{recipe.title}</strong>
                </Typography>
                <Typography sx={{ fontSize: 12 ,color:"#000000"}}>
                  {recipe.image.name}
                </Typography>
                <Typography sx={{ p: 1, fontSize: 14 , width : 600 , background: "#dddddd", borderRadius: 1 ,color:"#000000"}}>
                  {recipe.memo}
                </Typography>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}>
                  <Item>投稿した日：{format(recipe.createdAt.toDate(), "yyyy年MM月dd日")}</Item>
                  <Item>{recipe.image.user}</Item>
                  <Item>制作費用：<strong>{Number(recipe.productioncost).toLocaleString()}</strong> 円</Item>
                </Stack>
                {/* <Grid container spacing={1}>
                  <Grid item xs={8} align = "left">
                    <Typography sx={{ fontSize: 18 ,color:"#000000"}}>
                      投稿した日：{format(recipe.createdAt.toDate(), "yyyy年MM月dd日")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} align = "right">
                    <Typography sx={{ fontSize: 18 ,color:"#000000" }}>
                      制作費用：<strong>{Number(recipe.productioncost).toLocaleString()}</strong> 円
                    </Typography>
                  </Grid>
                </Grid> */}
              </Box>
            </Box>
          ))) : (
          <p>投稿が存在しません</p>)}
          <div ref={bottomRef}></div>
      </Grid>
    </ThemeProvider>
  );
}
