import React, 
     { useEffect,
       useState }          from "react"
import {Avatar,
        Box,
        Grid,
        Typography,
        Container,
        CssBaseline,
        Link, 
        Button,}           from "@mui/material"
import { createTheme, 
         ThemeProvider }   from '@mui/material/styles';
import RecipeDetailsHeader from "./RecipeDetailsHeader"
import RecipeDetailsButton from "./RecipeDetailsButton"
import Footer              from '../Footer';
import ThumbUpAltIcon      from '@mui/icons-material/ThumbUpAlt';
import StarsIcon           from '@mui/icons-material/Stars';
import CardMedia           from '@mui/material/CardMedia';
import useProfile          from "../hooks/useProfile"
import { firebaseApp }     from "../../firebase";
import { useHistory }      from 'react-router';
import { db }              from '../../firebase';
import { collection,
         getDocs ,}        from 'firebase/firestore';
import { format }          from "date-fns"
import InsertCommentIcon   from '@mui/icons-material/InsertComment';
import store               from '../../store/index';

const collectionRecipeName = "recipe"
const collectionUserName   = "users"
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
  const [recipe, setRecipe] = useState([]);
  const [userinfo, setUserInfo] = useState([]);
  const [getuid , setGetUID] = useState("")
  const [getavatarurl , setGetAvatarURL] = useState("")
  const profileData = useProfile()
  const profile = profileData.profile
  const firestorage = firebaseApp.firestorage
  const history = useHistory()
  const recipeAry = [];
  const userDataAry = [];

  // pathnameから作品Noを取得
  var recipenumAry = window.location.pathname.split("/")
  const getrecipenum = recipenumAry[2]

  // firestoreからレシピ情報の取得
  const fetchRecipeData = () => {
    getDocs(collection(db, collectionRecipeName)).then((querySnapshot)=>{
      // recipenumと遷移元のレシピNoを比較する
      querySnapshot.forEach((doc) => {
        console.log("doc.id => " ,doc.id,doc.data())
        console.log(format(doc.data().createdAt.toDate(), "yyyy年MM月dd日hh:mm"))
        // 備忘録：文字列を比較する際、見た目は一緒なのになぜか一致しない現象が起きた。
        // ただし、文字列同士をString()で処理すると問題解決
        if(String(doc.data().recipenum) === String(getrecipenum)){
          recipeAry.push({
            id : doc.id,
            ...doc.data()
          })
          var testUID = doc.data().image.uid
          store.getState().documentID       = doc.id                       // ドキュメントID
          store.getState().recipetitle      = doc.data().title             // 作品タイトル
          store.getState().category         = doc.data().category          // カテゴリー
          store.getState().productionCost   = doc.data().productioncost    // 制作費用
          store.getState().productionPeriod = doc.data().productionperiod  // 制作期間
          store.getState().productionMemo   = doc.data().memo              // 作品メモ
          store.getState().createdAt        = doc.data().createdAt         // 制作日時
          store.getState().displayName      = doc.data().image.user        // ユーザー名
          store.getState().recipeimage      = doc.data().image.url         // アバター画像
          setGetUID(testUID)
      }else{
    }})
    }).then(()=>{
      setRecipe([...recipeAry])
    })};

  // 編集ボタンをクリックしたらgetStateに各値を代入して遷移する
  const handleClick = () => {
    store.getState().photoURL    = getavatarurl      // アバターのURL
    history.push(`/recipedetails/${getrecipenum}/edit`)
  }

  // firestoreからユーザー情報の取得
  const fetchUsersData = () => {
    getDocs(collection(db, collectionUserName)).then((querySnapshot)=>{
      // recipenumと遷移元のレシピNoを比較する
      querySnapshot.forEach((doc) => {
        // 備忘録：文字列を比較する際、見た目は一緒なのになぜか一致しない現象が起きた。
        // ただし、文字列同士をString()で処理すると問題解決        
        if(String(doc.data().uid) === String(getuid)){
          userDataAry.push({
            id : doc.id,
            ...doc.data()
        })
        setGetAvatarURL(doc.data().image)
      }
    })
    }).then(()=>{
      setUserInfo([...userDataAry])
    })};

  useEffect(() => {
    fetchRecipeData()
    fetchUsersData()
  },[getuid]);

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
                  <Avatar src={getavatarurl} alt="" />
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
                      {recipe ? recipe.image.user : ""}
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
              {/* 作品画像を表示 */}
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
              {/* 作品コメント表示欄 */}
              <Grid>
                <Typography 
                  sx={{ 
                    fontSize: 14 , 
                    color:"#a0522d"}}>
                  作品カテゴリー
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
                  {recipe.category}
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
              {/* いいねボタン/数の表示 */}
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  color:"#000000"}}>
                <ThumbUpAltIcon sx={{ color : "#ffa500" , fontSize: 20 }}/>いいね！
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {/* お気に入りボタン/数の表示 */}
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  color:"#000000"}}>
                <StarsIcon sx={{ color : "#a0522d" , fontSize: 20}}/>お気に入り
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {/* コメントボタン/数の表示 */}
              <Typography 
                sx={{ 
                  p: 1, 
                  fontSize: 16 , 
                  color:"#000000"}}>
                <InsertCommentIcon sx={{ color : "#1e90ff", fontSize: 20 }}/>コメント
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <br/>
        <Grid container spacing={0} >
          <Grid item xs={12} align = "right">
            {/* 編集完了ボタンの表示 */}
            {profile && profile.uid === recipe.image.uid ? 
            <Button 
              variant = "contained"
              onClick = {handleClick}
              sx = {{width : 200}}>
                この投稿を編集する
            </Button> : ""}
          </Grid>
        </Grid>
        <br/>
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