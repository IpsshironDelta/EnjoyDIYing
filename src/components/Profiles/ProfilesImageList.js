import React ,
      { useEffect,
        useState,
        useRef , }          from "react";
import { db }               from '../../firebase';
import { collection,
         getDocs ,}         from 'firebase/firestore';
import { Typography , 
         Box ,
         Grid,
         createTheme , 
         ThemeProvider ,
         Link,
         Button,}              from "@mui/material"
import { format ,
         formatDistance,  } from "date-fns"
import { ja }               from "date-fns/locale"
import useProfile           from "../hooks/useProfile"
import Divider              from '@mui/material/Divider';
import Paper                from '@mui/material/Paper';
import Stack                from '@mui/material/Stack';
import { styled }           from '@mui/material/styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import StarsIcon from '@mui/icons-material/Stars';
import ProfilesImageButton from "./ProfilesImageButton";
import { firebaseApp }   from "../../firebase";

const collectionName = "recipe"
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const theme = createTheme()

export default function ProfileImageList() {
  const [recipe, setMessage] = useState([]);
  const [goodcount , setGoodCount] = useState(0)
  const [bookmarkcount , setBookMarkCount] = useState(0)
  const profileData = useProfile()             // プロフィール取得
  var profile = profileData.profile            // プロフィール取得
  const bottomRef = useRef(null)
  const array = [];
  const firestorage = firebaseApp.firestorage  // 認証情報チェック用

  // リンク先に遷移
  const testmethod = (event) => {
    console.log("TEST" , event)
  }

  // pathnameからuidを取得
  const uidAry = window.location.pathname.split("/")
  const getuid = uidAry[2]

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
        // ログインしているユーザー情報を取得
        firebaseApp.fireauth.onAuthStateChanged(user => {
            console.log("doc.data().image.uid : " , doc.data().image.uid)
            console.log("---")
            // ログインユーザーのuidとfirestore/recipe/image/uidの値が一致している場合のみ配列に追加
            // if(user.uid === doc.data().image.uid){
            if(getuid === doc.data().image.uid){
                array.push({
                id : doc.id,
                ...doc.data()
                })
            }})
        })
    }).then(()=>{
      setMessage([...array])    
    })};

  useEffect(() => {
    fetchUsersData()
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} >
        {recipe ? ( 
          recipe.map((recipe) => (
            <Box 
              key={recipe.id} 
              sx={{
                display: "flex",
                my: 2,
                gap: 2,
                flexGrow: 1, m: 2,}}
              onSubmit={testmethod}>
              <Box>
                  {/* 作品画像の表示 */}
                <ProfilesImageButton
                    imgURL = {recipe.image.url}
                    info   = {recipe}
                    text   = "何か入れる"
                    link   = "/recipedetail/"/>
              </Box>
              <Box sx={{ ml: 2 }}>
                {/* 作品タイトルの表示 */}
                <Grid container spacing={0} >
                <Grid item xs= {9}>
                  <Typography sx={{ fontSize: 18}}>
                    {/* 作品番号をアドレスの末尾に付与して遷移する */}
                    <Link href={`/recipedetails/${recipe.recipenum}`} color="#000000">
                      <strong>{recipe.title}</strong>
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs= {1} >
                  <Button
                   onClick={() => {
                    setGoodCount(goodcount +1)}}>
                    <ThumbUpAltIcon/>
                    <Typography color="#000000">
                        {goodcount}
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs= {1}>
                  <Button
                    onClick={() =>{
                      setBookMarkCount(bookmarkcount + 1)}}>
                    <StarsIcon color="#ffffff"/>
                    <Typography color="#000000">
                      {bookmarkcount}
                    </Typography>
                  </Button>                  
                </Grid>
                </Grid>
                {/* 作品メモの表示 */}
                <Typography 
                  sx={{ p: 1, fontSize: 12 , width : 400 , background: "#dddddd", borderRadius: 1 ,color:"#000000"}}>
                  {recipe.memo}
                </Typography>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}>
                    {/* 投稿日時の表示 */}
                  <Item>投稿日：{format(recipe.createdAt.toDate(), "yyyy年MM月dd日")}</Item>
                  {/* 制作費用の表示 */}
                  <Item>制作費用：<strong>{Number(recipe.productioncost).toLocaleString()}</strong> 円</Item>
                </Stack>
              </Box>
            </Box>
          ))) : (
          <p>投稿が存在しません</p>)}
          <div ref={bottomRef}></div>
      </Grid>
    </ThemeProvider>
  );
}
