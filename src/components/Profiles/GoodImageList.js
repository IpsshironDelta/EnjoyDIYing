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
const collectionBookMarkName  = "/bookmark"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const theme = createTheme()

export default function GoodImageList() {
  const profileData = useProfile()             // プロフィール取得
  var profile = profileData.profile            // プロフィール取得
  const bottomRef = useRef(null)
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

  // firestoreからユーザー情報の取得
  const [bookmark , setBookMark] = useState([]);
  const bookmarkAry = [];
  const [recipe , setRecipe] = useState([]);
  const recipeAry = [];
  const fetchRecipeData = () => {
    getDocs(collection(db, collectionRecipeName)).then((querySnapshot)=>{
      // recipenumと遷移元のレシピNoを比較する
      querySnapshot.forEach((document) => {
        // bookmarkコレクションの個数を取得
        getDocs(collection(db, collectionRecipeName+"/"+document.id+collectionBookMarkName)).then((querySnapshot)=>{
          querySnapshot.forEach((documentBookMark) => {
        // 備忘録：文字列を比較する際、見た目は一緒なのになぜか一致しない現象が起きた。
        // ただし、文字列同士をString()で処理すると問題解決
            if(String(getuid) === String(documentBookMark.data().uid)){
              bookmarkAry.push({
                id : documentBookMark.id,
                ...document.data(),
              })
              console.log("if文通過してます")
            }
          })
        }).then(()=>{
          setBookMark([...bookmarkAry])
          setRecipe([...recipeAry])
          console.log("bookmarkAry =>" , bookmarkAry)
        })
      })
    })}

  useEffect(() => {
    fetchRecipeData()
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} >
        {bookmark ? ( 
          bookmark.map((bookmark) => (
            <Box 
            key={bookmark.id} 
            sx={{
              display: "flex",
              my: 2,
              gap: 2,
              flexGrow: 1, m: 2,}}>
            <Grid item xs={2} align = "left">
              <Box>
                {/* 作品画像の表示 */}
                <ProfilesImageButton
                  imgURL = {bookmark.image.url}
                  info   = {bookmark}
                  text   = "何か入れる"
                  link   = "/recipedetail/"/>
              </Box>
            </Grid>
            <Grid item xs={10} align = "left">
            {/* 作品タイトルの表示 */}
              <Typography sx={{ fontSize: 18 , width : 380}}>
                {/* 作品番号をアドレスの末尾に付与して遷移する */}
                <Link href={`/recipedetails/${bookmark.recipenum}`} color="#000000">
                  <strong>{bookmark.title}</strong>
                </Link>
              </Typography>
              <Grid container spacing={0} >
                <Grid item xs={6} align = "center">
                  {/* いいねボタン表示 */}
                  <Grid container spacing={0} >
                    <Grid item xs={4} align = "left">
                      <ThumbUpAltIcon sx={{ color : "#ffa500" , fontSize: 20 }}/>
                      <Typography color="#000000" variant="caption" fontSize={15}>
                          {bookmark.good}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} align = "left">
                      {/* お気に入りボタン表示 */}
                      <StarsIcon color="#ffffff" sx={{ color : "#a0522d" , fontSize: 20 }}/>
                      <Typography color="#000000" variant="caption" fontSize={15}>
                        {bookmark.bookmark}
                      </Typography>
                    </Grid>
                    {/* コメントボタン表示 */}
                    {/* <Grid item xs={4} align = "left">
                      <InsertCommentIcon sx={{ color : "#1e90ff" , fontSize: 20 }}/>
                      <Typography color="#000000" variant="caption" fontSize={15}>
                          {goodcount}
                      </Typography>
                    </Grid> */}
                  </Grid>
                </Grid>
                  {/* 投稿日時の表示 */}
                <Grid item xs={6} align = "left">
                  <Typography color="#000000" variant="body2">
                    投稿日：{format(bookmark.createdAt.toDate(), "yyyy年MM月dd日")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          ))) : (
          <p>投稿が存在しません</p>)}
      </Grid>
    </ThemeProvider>
  );
}
