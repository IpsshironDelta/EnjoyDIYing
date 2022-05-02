import  React ,
      { useEffect,
        useState,
        useRef , }           from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import StarsIcon from '@mui/icons-material/Stars';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { collection,
         getDocs ,}          from 'firebase/firestore';
import { Typography , 
         Box ,
         Grid,
         createTheme , 
         ThemeProvider ,
         Link,
         Button,}            from "@mui/material"
import { format ,
         formatDistance,  }  from "date-fns"
import { db }                from '../../firebase';
import { useHistory}         from 'react-router';
import { ja }                from "date-fns/locale"
import   useProfile          from "../hooks/useProfile"
import   Paper               from '@mui/material/Paper';
import { styled }            from '@mui/material/styles';
import   ProfilesImageButton from "./ProfilesImageButton";
import { firebaseApp }       from "../../firebase";


const collectionRecipeName = "recipe"
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const theme = createTheme()

export default function ProfileImageList() {
  const [recipe, setRecipe] = useState([]);
  const [goodcount , setGoodCount] = useState(0)
  const [bookmarkcount , setBookMarkCount] = useState(0)
  const profileData = useProfile()             // プロフィール取得
  var profile = profileData.profile            // プロフィール取得
  const bottomRef = useRef(null)
  const recipeAry = [];
  const history = useHistory()
  const firestorage = firebaseApp.firestorage  // 認証情報チェック用

  // リンク先に遷移
  const handleSubmit = (event) => {
    history.push("/recipedetails/edit")
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

  const fetchRecipeData = () => {
    getDocs(collection(db, collectionRecipeName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // ログインしているユーザー情報を取得
        firebaseApp.fireauth.onAuthStateChanged(user => {
            console.log("doc.data().image.uid : " , doc.data().image.uid)
            console.log("---")
            // ログインユーザーのuidとfirestore/recipe/image/uidの値が一致している場合のみ配列に追加
            // if(user.uid === doc.data().image.uid){
            if(getuid === doc.data().image.uid){
              recipeAry.push({
                id : doc.id,
                ...doc.data()
                })
            }})
        })
    }).then(()=>{
      setRecipe([...recipeAry])    
    })};

  useEffect(() => {
    fetchRecipeData()
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} >
        {recipe ? ( 
          recipe.map((recipe) => (
          <Box 
            key={recipe.id} 
            sx={{
              display: "flex",
              my: 2,
              gap: 2,
              flexGrow: 1, m: 2,}}>
            <Grid item xs={2} align = "left">
              <Box>
                {/* 作品画像の表示 */}
                <ProfilesImageButton
                  imgURL = {recipe.image.url}
                  info   = {recipe}
                  text   = "何か入れる"
                  link   = "/recipedetail/"/>
              </Box>
            </Grid>
            <Grid item xs={10} align = "left">
            {/* 作品タイトルの表示 */}
              <Typography sx={{ fontSize: 18 , width : 380}}>
                {/* 作品番号をアドレスの末尾に付与して遷移する */}
                <Link href={`/recipedetails/${recipe.recipenum}`} color="#000000">
                  <strong>{recipe.title}</strong>
                </Link>
              </Typography>
              <Grid container spacing={0} >
                <Grid item xs={6} align = "center">
                  {/* いいねボタン表示 */}
                  <Grid container spacing={0} >
                  <Grid item xs={4} align = "left">
                    <ThumbUpAltIcon sx={{ color : "#ffa500" , fontSize: 20 }}/>
                    <Typography color="#000000" variant="caption" fontSize={15}>
                        {goodcount}
                    </Typography>
                    </Grid>
                    <Grid item xs={4} align = "left">
                    {/* お気に入りボタン表示 */}
                    <StarsIcon color="#ffffff" sx={{ color : "#a0522d" , fontSize: 20 }}/>
                    <Typography color="#000000" variant="caption" fontSize={15}>
                      {bookmarkcount}
                    </Typography>
                    </Grid>
                    <Grid item xs={4} align = "left">
                    {/* </Button> */}
                    <InsertCommentIcon sx={{ color : "#1e90ff" , fontSize: 20 }}/>
                    <Typography color="#000000" variant="caption" fontSize={15}>
                        {goodcount}
                    </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                  {/* 投稿日時の表示 */}
                <Grid item xs={6} align = "left">
                  <Typography color="#000000" variant="body2">
                    投稿日：{format(recipe.createdAt.toDate(), "yyyy年MM月dd日")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          ))) : (
          <p>投稿が存在しません</p>)}
          <div ref={bottomRef}></div>
      </Grid>
    </ThemeProvider>
  );
}
