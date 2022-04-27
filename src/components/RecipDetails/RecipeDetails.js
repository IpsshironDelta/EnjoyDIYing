import React, 
     { useEffect,
       useState } from "react"
import {Avatar,
        Box,
        Grid,
        Stack,
        Typography,
        Container,
        CssBaseline,
        Link ,}      from "@mui/material"
import { createTheme, 
         ThemeProvider }   from '@mui/material/styles';
import RecipeDetailsHeader from "./RecipeDetailsHeader"
import Footer              from '../Footer';
import ThumbUpAltIcon      from '@mui/icons-material/ThumbUpAlt';
import StarsIcon           from '@mui/icons-material/Stars';
import CardMedia           from '@mui/material/CardMedia';
import useProfile          from "../hooks/useProfile"
import { firebaseApp }   from "../../firebase";
import { useHistory }    from 'react-router';
import { db }               from '../../firebase';
import { collection,
         getDocs ,}         from 'firebase/firestore';
import { format } from "date-fns"

const collectionName = "recipe"
const theme = createTheme({
  shadows: ["none"],
  palette: {
    // ボタンのカラー設定
    primary: {
      main: '#E64545',
      contrastText: '#ffffff',
    },
    // 背景のカラー設定
    background: {
      default: '#ffffff',
    },
    // テキストのカラー設定
    text: { primary: '#000000' },
  },
});

export default function RecipDetail() {
  const [name, setName] = useState("")
  const [recipe, setRecipe] = useState([]);
  const [location , setLocation] = useState("")
  const profileData = useProfile()
  const profile = profileData.profile
  const firestorage = firebaseApp.firestorage
  const history = useHistory()
  const array = [];

  // pathnameから作品Noを取得
  var recipenumAry = window.location.pathname.split("/")
  const getrecipenum = recipenumAry[2]

  // firestoreからレシピ情報の取得
  const fetchUsersData = () => {
    getDocs(collection(db, collectionName)).then((querySnapshot)=>{
      // recipenumと遷移元のレシピNoを比較する
      querySnapshot.forEach((doc) => {
        console.log(doc.id,doc.data())
        console.log(doc.data().text)
        console.log(format(doc.data().createdAt.toDate(), "yyyy年MM月dd日hh:mm"))
        // 備忘録：文字列を比較する際、見た目は一緒なのになぜか一致しない現象が起きた。
        // ただし、文字列同士をString()で処理すると問題解決
        if(String(doc.data().recipenum) === String(getrecipenum)){
          array.push({
            id : doc.id,
            ...doc.data()
        })
      }else{
    }})
    }).then(()=>{
      setRecipe([...array])
    })};

  useEffect(() => {
    fetchUsersData()
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecipeDetailsHeader/>
      {recipe ? ( 
          recipe.map((recipe) => (
      <Box>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,}}>
          <Container maxWidth="md">
            {/* 作品タイトル表示欄 */}
            <Typography
              sx={{ 
                p: 1, 
                fontSize: 32 , 
                background: "#faf0e6", 
                borderRadius: 1 ,
                color:"#a0522d"}}>
              <strong>{recipe.title}</strong>
            </Typography>
            <Box
              sx={{
                pt : 1,
                pl : 4,
                pr : 4,}}>
              <Grid container spacing={4}>
                <Grid item xs={1}>
                  {/* 作成したユーザーのアバター画像表示 */}
                  <Avatar src={recipe ? recipe.image.userimageurl : ""} alt="" />
                </Grid>
                <Grid item xs={5}>
                  {/* 作成したユーザー名を表示 */}
                  <Typography 
                    sx={{ 
                      p: 1, 
                      fontSize: 14 , 
                      width : 600 , 
                      color:"#000000"}}>
                    {/* uidをアドレスの末尾に付与して遷移する */}
                    <Link href={`/profiles/${recipe.image.uid}`} color="#000000">
                      {name ? name : recipe ? recipe.image.user : ""}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6} align="center">
                  {/* 投稿した日時を表示 */}
                  <Typography 
                    sx={{ 
                      p: 1, 
                      fontSize: 14 , 
                      width : 600 , 
                      color:"#000000"}}>
                    投稿した日時：{format(recipe.createdAt.toDate(), "yyyy年MM月dd日")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
        <Box
          sx={{
            bgcolor: '#eeeeee',
            pb : 4,
            pl : 4,
            pr : 4,}}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Typography variant="body2" align='left'>
                <CardMedia
                  component = "img"
                  height    = "250"
                  image     = {recipe.image.url}
                  alt       = "Paella dish"/>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              {/* 作品コメント表示欄 */}
              <Grid>
                <Typography 
                  sx={{ 
                    fontSize: 14 , 
                    color:"#a0522d"}}>
                  作品のコメント
                </Typography>
              </Grid>
              <Grid>
                <Typography 
                  sx={{ 
                    p: 1, 
                    fontSize: 16 , 
                    background: "#ffffff", 
                    borderRadius: 1 ,
                    color:"#000000"}}>
                  {recipe.memo}
                </Typography>
              </Grid>
              <br/>
              {/* 制作費用の表示 */}
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  background: "#ffffff", 
                  borderRadius: 1 ,
                  color:"#a0522d"}}>
                かかった費用 : <strong>{Number(recipe.productioncost).toLocaleString()}</strong> 円
              </Typography>
              <br/>
              {/* 制作期間の表示 */}
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  background: "#ffffff", 
                  borderRadius: 1 ,
                  color:"#a0522d"}}>
                所要時間 :  <strong>約 {recipe.productionperiod}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <br/>
        <Box
          sx={{
            bgcolor: '#eeeeee',
            pl : 4,
            pr : 4,}}>
          <Grid container spacing={0} >
            <Grid item xs={2}>
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  color:"#000000"}}>
                <ThumbUpAltIcon/>いいね
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  color:"#000000"}}>
                <StarsIcon/>お気に入り
              </Typography>
            </Grid>
          </Grid>
        </Box>
        </Container>
      </Box>
      ))) : (
        <p>投稿が存在しません</p>)}
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}