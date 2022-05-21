import  React ,
      { useEffect,
        useState, }         from "react";
import { db }               from '../../firebase';
import { doc , 
         collection,
         getDocs ,
         updateDoc ,}       from 'firebase/firestore';
import { Typography , 
         Box ,
         Grid,
         createTheme , 
         ThemeProvider ,
         Link,
         Button,}             from "@mui/material"
import { format ,}          from "date-fns"
import   useProfile         from "../hooks/useProfile"
import   Paper              from '@mui/material/Paper';
import { styled }           from '@mui/material/styles';
import   MainpageImgButton  from '../MainPage/MainPageImageButton'
import   ThumbUpAltIcon     from '@mui/icons-material/ThumbUpAlt';
import   StarsIcon          from '@mui/icons-material/Stars';
import { firebaseApp }      from "../../firebase";

const collectionRecipeName    = "recipe"
const collectionGoodName      = "/good"
const collectionBookMarkName  = "/bookmark"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const theme = createTheme()

export default function MainPageImageList() {
  const [recipe, setRecipe] = useState([]);

  const profileData = useProfile()
  const profile = profileData.profile
  const recipeAry = [];

  // firestoreからレシピ情報の取得
  const fetchRecipeData = () => {
    var goodBuffCount = 0
    var bookmarkBuffCount = 0
    const firestore = firebaseApp.firestore
    getDocs(collection(db, collectionRecipeName)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        // goodコレクションの個数を取得
        const docGoodRef = doc(firestore, collectionRecipeName , document.id)
        getDocs(collection(db, collectionRecipeName+"/"+document.id+collectionGoodName)).then((querySnapshot)=>{
          // 初期化
          goodBuffCount = 0
          querySnapshot.forEach((documentGood) => {
            goodBuffCount = goodBuffCount + 1
          })
          updateDoc(docGoodRef , {
            good : goodBuffCount,
          })
        })
        // bookmarkコレクションの個数を取得
        getDocs(collection(db, collectionRecipeName+"/"+document.id+collectionBookMarkName)).then((querySnapshot)=>{
          // 初期化
          bookmarkBuffCount = 0  
          querySnapshot.forEach((documentBookMark) => {
            bookmarkBuffCount = bookmarkBuffCount + 1
          })
          updateDoc(docGoodRef , {
            bookmark : bookmarkBuffCount,
          })
        })
        recipeAry.push({
          id : document.id,
          good : 0,
          bookmark : 0,
          ...document.data(),
        })
      })
    }).then(()=>{
      console.log("recipeAry : " , recipeAry)
      setRecipe([...recipeAry])
      // オブジェクト内の日付(createdAt)をキーに昇順にソートする
      recipeAry.sort(function(first , second){
        return (format(first.createdAt.toDate() , "yyyyMMdd") < format(second.createdAt.toDate() , "yyyyMMdd")) ? -1 : 1
      })
    })
  }

  useEffect(() => {
    fetchRecipeData()
  },[]);


  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} >
      {recipe ? (
        recipe.sort().map((recipe) => (
          <Grid item xs={3}>
            <Box 
              key={recipe.id} 
              sx={{
                display: "flex",
                pt : 2,
                pb : 2,
                pl : 1,
                pr : 1,
                m: 1,
                maxWidth : 185,
                borderTop    : "solid #dddddd 1px",
                borderBottom : "solid #dddddd 1px",
                borderLeft   : "solid #dddddd 1px",
                borderRight  : "solid #dddddd 1px",}}>
              <Box>
                <MainpageImgButton
                    imgURL = {recipe.image.url}
                    info   = {recipe}
                    className   = "MuiImageBackdrop-root"
                    link   = "/recipedetail/"
                    style  = {{width: "167px",height:"167px"}}/>
                  <Typography sx={{ fontSize: 14}}>
                    {/* 作品番号をアドレスの末尾に付与して遷移する */}
                    <Button 
                      sx = {{fontSize:11 ,
                              borderRadius : 2,
                              color:"#ffffff" , 
                              backgroundColor : "#E64545",
                              height : 20,
                              "&:hover": {
                                background: "#E64545"},}}>
                      {recipe.detail}
                    </Button>
                  </Typography>
                  <Typography sx={{ fontSize: 14}}>
                    {/* 作品番号をアドレスの末尾に付与して遷移する */}
                    <Link href={`/recipedetails/${recipe.recipenum}`} color="#000000" underline="none">
                      <strong>{recipe.title}</strong>
                    </Link>
                  </Typography>
                  {/* 投稿したユーザーの表示 */}
                  {/* uidをアドレスの末尾に付与して遷移する */}
                  <Typography
                    sx={{ fontSize: 9 ,color:"#000000" }}
                    align = "right">
                    <Link href={`/profiles/${recipe.image.uid}`} color="#000000" underline="none">
                      {recipe.image.user}
                    </Link>
                  </Typography>
                  <Grid container spacing={0} >
                    <Grid item xs= {9} align = "right">
                      {/* いいねボタン表示/いいね数表示 */}
                      <ThumbUpAltIcon sx={{ color : "#ffa500" ,fontSize: 13}}/>
                        <Typography color="#000000" variant="caption" fontSize={13}>
                          {recipe.good}
                        </Typography>
                    </Grid>
                    {/* お気に入りボタン表示/お気に入り数表示 */}
                    <Grid item xs= {3} align = "right">
                      <StarsIcon sx={{ color : "#a0522d" ,fontSize: 13}}/>
                      <Typography color="#000000" variant="caption" fontSize={13}>
                        {recipe.bookmark}
                      </Typography>
                    </Grid>
                  </Grid>
              </Box>
            </Box>
          </Grid>
        ))) : (
        <p>投稿が存在しません</p>)}
      </Grid>
    </ThemeProvider>
  );
}
