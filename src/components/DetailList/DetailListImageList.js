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
         Link,}             from "@mui/material"
import { format ,}          from "date-fns"
import   useProfile         from "../hooks/useProfile"
import   Divider            from '@mui/material/Divider';
import   Paper              from '@mui/material/Paper';
import   Stack              from '@mui/material/Stack';
import { styled }           from '@mui/material/styles';
import   DetailListImageButton  from './DetailListImageButton'
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

export default function DetailListImageList(props) {
    
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
        <Grid item xs={12} >
        {recipe.sort().map((recipe) => (
            // カテゴリー(detail)が一致していて、表示している作品以外の投稿を表示する
            (recipe.detail === props.GetDetail || recipe.category === props.GetCategory ? 
                <Box 
                key={recipe.id} 
                sx={{
                    display: "flex",
                    my: 2,
                    gap: 2,
                    flexGrow: 1, m: 2,}}>
                    <Box>
                        <DetailListImageButton
                            imgURL = {recipe.image.url}
                            info   = {recipe}
                            className   = "MuiImageBackdrop-root"
                            link   = "/recipedetail/"
                            style  = {{width: "100px"}}/>
                    </Box>
                    <Box sx={{ ml: 2 }}>
                        {/* 作品タイトルの表示 */}
                        <Grid container spacing={0} >
                        <Grid item xs= {10}>
                        <Typography sx={{ fontSize: 22}}>
                            {/* 作品番号をアドレスの末尾に付与して遷移する */}
                            <Link href={`/recipedetails/${recipe.recipenum}`} color="#000000">
                            <strong>{recipe.title}</strong>
                            </Link>
                        </Typography>
                        </Grid>
                        <Grid item xs= {1} >
                        {/* いいねボタン表示/いいね数表示 */}
                        <ThumbUpAltIcon sx={{ color : "#ffa500" ,fontSize: 20}}/>
                            <Typography color="#000000" variant="caption" fontSize={15}>
                            {recipe.good}
                            </Typography>
                        </Grid>
                        {/* お気に入りボタン表示/お気に入り数表示 */}
                        <Grid item xs= {1}>
                        <StarsIcon sx={{ color : "#a0522d" }}/>
                        <Typography color="#000000" variant="caption" fontSize={15}>
                            {recipe.bookmark}
                        </Typography>
                        </Grid>
                        {/* コメント表示/コメント数表示 */}
                        {/* ★後日実装 */}
                        {/* <Grid item xs= {1}>
                        <InsertCommentIcon sx={{ color : "#1e90ff" }}/>
                        <Typography color="#000000" variant="caption" fontSize={15}>
                            XXX
                        </Typography>
                        </Grid> */}
                        </Grid>
                        {/* 作品メモの表示 */}
                        <Grid>
                        <Typography 
                            sx={{ p: 1, 
                                fontSize: 14 , 
                                maxWidth : 600 ,
                                minWidth : 600 , 
                                background: "#dddddd" ,
                                color:"#000000",
                                borderRadius : 3,}}>
                            {recipe.memo}
                            <Typography
                            sx={{ fontSize: 12 ,color:"#000000" }}
                            align = "right">
                            投稿した日：{format(recipe.createdAt.toDate(), "yyyy年MM月dd日")}
                            </Typography>
                        </Typography>
                        </Grid>
                        <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}>
                            {/* 投稿日時の表示 */}
                        <Item 
                            sx = {{
                            minWidth : 250,
                            maxWidth : 250,}}>
                            {/* 投稿したユーザーの表示 */}
                            {/* uidをアドレスの末尾に付与して遷移する */}
                            <Typography
                            sx={{ fontSize: 12 ,color:"#000000" }}
                            align = "left">
                            <Link href={`/profiles/${recipe.image.uid}`} color="#000000">
                                {recipe.image.user}
                            </Link>
                            </Typography>
                        </Item>
                        {/* 制作費用の表示 */}
                        <Item sx = {{
                            minWidth : 250,
                            maxWidth : 250,}}>
                            <Typography
                            sx={{ fontSize: 12 ,color:"#000000" }}
                            align = "left">
                            制作費用：<strong>{Number(recipe.cost).toLocaleString()}</strong> 円
                            </Typography>
                        </Item>
                        </Stack>
                    </Box>
                </Box>
            : "No")))}
        </Grid>
        </ThemeProvider>
    );
}
