import React, 
     { useEffect,
       useState }          from "react"
import {Alert , 
        Avatar,
        Box,
        Grid,
        Typography,
        Container,
        CssBaseline,
        Link, 
        Button,
        IconButton,
        Tooltip , }        from "@mui/material"
import { createTheme, 
         ThemeProvider }   from '@mui/material/styles';
import RecipeDetailsHeader from "./RecipeDetailsHeader"
import Footer              from '../Footer';
import ThumbUpAltIcon      from '@mui/icons-material/ThumbUpAlt';
import CardMedia           from '@mui/material/CardMedia';
import useProfile          from "../hooks/useProfile"
import { firebaseApp }     from "../../firebase";
import { useHistory }      from 'react-router';
import { db }              from '../../firebase';
import { collection,
         getDocs ,
         addDoc ,
         Timestamp ,
         doc ,
         deleteDoc ,}      from 'firebase/firestore';
import { format }          from "date-fns"
import InsertCommentIcon   from '@mui/icons-material/InsertComment';
import store               from '../../store/index';
import Message             from "./RecipeDetailsMessage";
import StarsIcon           from '@mui/icons-material/Stars';

const collectionRecipeName    = "recipe"
const collectionUserName      = "users"
const collectionMessageName   = "message"
const collectionBookMarkName  = "/bookmark"
const collectionGoodName      = "/good"

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
    text: { 
      primary: '#000000' },
    },
});

export default function RecipDetail() {
  const [goodadd , setGoodAdd] = useState("")
  const [goodcansel , setGoodCansel] = useState("")
  const [goodflg , setGoodFlg] = useState(false)
  const [bookmarkadd , setBookMarkAdd] = useState("")
  const [bookmarkcansel , setBookMarkCansel] = useState("")
  const [bookmarkflg , setBookMarkFlg] = useState(false)
  const [recipe, setRecipe] = useState([])
  const [userinfo, setUserInfo] = useState([])
  const [message, setMessage] = useState([])
  const [getuid , setGetUID] = useState("")
  const [getavatarurl , setGetAvatarURL] = useState("")
  const profileData = useProfile()
  const profile = profileData.profile
  const firestorage = firebaseApp.firestorage
  const history = useHistory()
  const recipeAry = [];
  const userDataAry = [];
  const messageAry = [];
  const [commentcount , setCommentCount] = useState("")

  // pathnameから作品Noを取得
  var recipenumAry = window.location.pathname.split("/")
  const getrecipenum = recipenumAry[2]

  // firestoreからレシピ情報の取得
  const fetchRecipeData = () => {
    var goodBuffCount = 0
    var bookarkBuffCount = 0
    var goodFlg = 0
    var bookmarkFlg = 0
    getDocs(collection(db, collectionRecipeName)).then((querySnapshot)=>{
      // recipenumと遷移元のレシピNoを比較する
      querySnapshot.forEach((doc) => {
        // 備忘録：文字列を比較する際、見た目は一緒なのになぜか一致しない現象が起きた。
        // ただし、文字列同士をString()で処理すると問題解決
        if(String(doc.data().recipenum) === String(getrecipenum)){
          recipeAry.push({
            id : doc.id,
            ...doc.data()
          })
          setGetUID(doc.data().image.uid)
          store.getState().documentID       = doc.id               // ドキュメントID
          store.getState().recipeUID        = doc.data().image.uid // 投稿したユーザーのUID
          store.getState().recipetitle      = doc.data().title     // 作品タイトル
          store.getState().category         = doc.data().category  // 大項目(category)
          store.getState().detail           = doc.data().detail    // 小項目(detail)
          store.getState().productionCost   = doc.data().cost      // 制作費用
          store.getState().productionPeriod = doc.data().period    // 制作期間
          store.getState().productionMemo   = doc.data().memo      // 作品メモ
          store.getState().createdAt        = doc.data().createdAt // 制作日時
          store.getState().displayName      = doc.data().image.user// ユーザー名
          store.getState().recipeimage      = doc.data().image.url // アバター画像
          // goodコレクションの個数を取得
          getDocs(collection(db, collectionRecipeName+"/"+doc.id+collectionGoodName)).then((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
              goodBuffCount = goodBuffCount +1
              // 既にgoodコレクションに登録されているか判定する
              // 登録済の場合は、いいねボタンをカラー表示する
              if(String(doc.data().uid)===String(store.getState().loginUserUID)){
                console.log("goodコレクションにて一致しています。")
                console.log(doc.data().uid , store.getState().loginUserUID)
                goodFlg = goodFlg + 1 
              }else{
                console.log("goodコレクションにて一致していません。")
                console.log(doc.data().uid , store.getState().loginUserUID)
              }
            })
            // goodFlgが0以上であればgoodコレクションに同じUIDが存在する
            if(goodFlg > 0){
              setGoodFlg(true)
            }else{
              setGoodFlg(false)
            }
            setGoodCount(goodBuffCount)
          })
          // bookmarkコレクションの個数を取得
          getDocs(collection(db, collectionRecipeName+"/"+doc.id+collectionBookMarkName)).then((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
              bookarkBuffCount = bookarkBuffCount +1
              // 既にbookmarkコレクションに登録されているか判定する
              // 登録済の場合は、いいねボタンをカラー表示する
              if(String(doc.data().uid)===String(store.getState().loginUserUID)){
                console.log("bookmarkコレクションにて一致しています。")
                console.log(doc.data().uid , store.getState().loginUserUID)
                bookmarkFlg = bookmarkFlg + 1 
              }else{
                console.log("bookmarkコレクションにて一致していません。")
                console.log(doc.data().uid , store.getState().loginUserUID)
              }
            })
            // bookmarkFlgが0以上であればbookmarkコレクションに同じUIDが存在する
            if(bookmarkFlg > 0){
              setBookMarkFlg(true)
            }else{
              setBookMarkFlg(false)
            }
            setBookMarkCount(bookarkBuffCount)
          })
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

  // firebaseからメッセージ情報の取得
  const fetchMessageData = () => {
    getDocs(collection(db, collectionMessageName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // 対象の作品(getrecipenum)と一致するコメントのみ表示する
        if(String(getrecipenum) === String(doc.data().recipeCommentNum)){
          messageAry.push({
            id : doc.id,
            ...doc.data()
          })
        }
      })
    }).then(()=>{
      setMessage([...messageAry])
      setCommentCount(messageAry.length)
    })};

  useEffect(() => {
    fetchUsersData()
    fetchRecipeData()
    fetchMessageData()
  },[getuid]);

// いいねボタンクリック時の操作
  const [goodcount , setGoodCount] = useState("")
  const handleGoodIcon = () => {
    // 表示中のアラートを消す
    setGoodAdd(false)
    setGoodCansel(false)
    setBookMarkAdd(false)
    setBookMarkCansel(false)
    var count = 0
    var documentOKFlg = 0
    var buffDocID = ""
    const firestore = firebaseApp.firestore
    // recipeのドキュメントを取得
    getDocs(collection(db, collectionRecipeName)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        // goodコレクションに追加1
        if(String(document.id)===String(recipe[0].id)){
          const docRef = collection(firestore , collectionRecipeName+"/"+document.id+collectionGoodName)
          // goodコレクションの個数を取得
          const goodCollectionRef = collectionRecipeName+"/"+document.id+collectionGoodName
          getDocs(collection(db, collectionRecipeName+"/"+document.id+collectionGoodName)).then((querySnapshot)=>{
            querySnapshot.forEach((documentGood) => {
              count = count +1
              documentOKFlg = documentOKFlg + 1
              if(String(documentGood.data().uid)===String(store.getState().loginUserUID)){
                // 既に登録済しているのでgoodコレクションから削除する
                buffDocID = documentGood.id
                console.log("documentOKFlg : ",documentOKFlg)
                documentOKFlg = documentOKFlg + 1
              }else{
                // 登録していないのでgoodコレクションに追加する
                console.log("documentOKFlg : ",documentOKFlg)
              }
            })
            console.log("documentOKFlg : ",documentOKFlg)
            if(count === 0 && documentOKFlg === 0){
              // いいねが0件の場合はこちらから追加する
              console.log("いいねが0件の場合はこちらから追加する")
              addDoc(docRef, {
                uid : profile.uid,
                clickdate: Timestamp.fromDate(new Date()),  // ボタンをクリックした日時
              })
              count = count + 1
              setGoodCount(count)
              setGoodAdd(true)
              setGoodFlg(true)
            }else if(documentOKFlg > 1){
              console.log("goodコレクションから削除しました。")
              deleteDoc(doc(db , goodCollectionRef , buffDocID))
              count = count - 1
              setGoodCount(count)
              setGoodCansel(true)
              setGoodFlg(false)
            }else if(documentOKFlg === 1){
              console.log("いいねが1件以上の場合はこちらから追加する")
              addDoc(docRef, {
                uid : profile.uid,
                clickdate: Timestamp.fromDate(new Date()),  // ボタンをクリックした日時
              })
              count = count + 1
              setGoodCount(count)
              setGoodAdd(true)
              setGoodFlg(true)
            }
          })
        }
      })
    }).then(()=>{
      // 何もしない
    })
  }

// お気に入りボタンクリック時の操作
const [bookmarkcount , setBookMarkCount] = useState("")
  const handleBookMarkIcon = () => {
    // 表示中のアラートを消す
    setGoodAdd(false)
    setGoodCansel(false)
    setBookMarkAdd(false)
    setBookMarkCansel(false)
    var count = 0
    var documentOKFlg = 0
    var buffDocID = ""
    const firestore = firebaseApp.firestore
    // recipeのドキュメントを取得
    getDocs(collection(db, collectionRecipeName)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        // bookmarkコレクションに追加
        if(String(document.id)===String(recipe[0].id)){
          const docRef = collection(firestore , collectionRecipeName+"/"+document.id+collectionBookMarkName)
          // bookmarkコレクションの個数を取得
          const bookmarkCollectionRef = collectionRecipeName+"/"+document.id+collectionBookMarkName
          getDocs(collection(db, collectionRecipeName+"/"+document.id+collectionBookMarkName)).then((querySnapshot)=>{
            querySnapshot.forEach((documentBookMark) => {
              count = count +1
              documentOKFlg = documentOKFlg + 1
              if(String(documentBookMark.data().uid)===String(store.getState().loginUserUID)){
                // 既に登録済しているのでgoodコレクションから削除する
                buffDocID = documentBookMark.id
                console.log("documentOKFlg : ",documentOKFlg)
                documentOKFlg = documentOKFlg + 1
              }else{
                // 登録していないのでgoodコレクションに追加する
                console.log("documentOKFlg : ",documentOKFlg)
              }
            })
            console.log("documentOKFlg : ",documentOKFlg)
            if(count === 0 && documentOKFlg === 0){
              // いいねが0件の場合はこちらから追加する
              console.log("いいねが0件の場合はこちらから追加する")
              addDoc(docRef, {
                uid : profile.uid,
                clickdate: Timestamp.fromDate(new Date()),  // ボタンをクリックした日時
              })
              count = count + 1
              setBookMarkCount(count)
              setBookMarkAdd(true)
              setBookMarkFlg(true)
            }else if(documentOKFlg > 1){
              console.log("goodコレクションから削除しました。")
              deleteDoc(doc(db , bookmarkCollectionRef , buffDocID))
              count = count - 1
              setBookMarkCount(count)
              setBookMarkCansel(true)
              setBookMarkFlg(false)
            }else if(documentOKFlg === 1){
              console.log("いいねが1件以上の場合はこちらから追加する")
              addDoc(docRef, {
                uid : profile.uid,
                clickdate: Timestamp.fromDate(new Date()),  // ボタンをクリックした日時
              })
              count = count + 1
              setBookMarkCount(count)
              setBookMarkAdd(true)
              setBookMarkFlg(true)
            }
          })
        }
      })
    }).then(()=>{
      // 何もしない
    })
  }

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
            pt: 1,
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
                  作品コメント
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
              <Grid container spacing={4}>
                <Grid item xs={6}>
                <Typography 
                  sx={{ 
                    fontSize: 14 , 
                    color:"#000000"}}>
                  大項目
                </Typography>
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
                <Grid item xs={6}>
                  <Typography 
                    sx={{ 
                      fontSize: 14 , 
                      color:"#000000"}}>
                    小項目
                  </Typography>
                  <Typography 
                    sx={{ 
                      p: 1, 
                      fontSize: 16 , 
                      background: "#ffffff", 
                      borderRadius: 1 ,
                      color:"#000000"}}>
                    {recipe.detail}
                  </Typography>
                </Grid>
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
                かかった費用 : <strong>{Number(recipe.cost).toLocaleString()}</strong> 円
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
                所要時間 :  <strong>約 {recipe.period}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            bgcolor: '#eeeeee',
            pl : 4,
            pr : 4,}}>
          <Grid container spacing={0} >
            <Grid item xs={2}>
              {/* いいねボタン/数の表示 */}
              {/* 既にいいねが押されている場合は、青色(color:"#4169e1")を設置、
                  押されていない場合は、グレー表示
                  登録済の状態でクリックした場合は、goodコレクションから削除し、
                  グレー表示にする */}
              {goodflg ? 
              <Typography 
                sx={{ 
                  fontSize: 14 , 
                  color:"#4169e1"}}>
                <IconButton
                  onClick={handleGoodIcon}>
                  <Tooltip title="いいねする" arrow>
                    <ThumbUpAltIcon sx={{ color : "#4169e1" ,fontSize: 20}}/>
                  </Tooltip>
                </IconButton>
                いいね！：{goodcount}件
              </Typography>:
              <Typography 
                sx={{ 
                  fontSize: 14 , 
                  color:"#000000"}}>
                <IconButton
                  onClick={handleGoodIcon}>
                  <Tooltip title="いいねする" arrow>
                    <ThumbUpAltIcon sx={{ color : "#696969" ,fontSize: 20}}/>
                  </Tooltip>
                </IconButton>
                いいね！：{goodcount}件
              </Typography> }
            </Grid>
            <Grid item xs={3}>
              {/* お気に入りボタン/数の表示 */}
              {/* 既にお気に入りが押されている場合は、青色(color:"#4169e1")を設置、
                  押されていない場合は、グレー表示
                  登録済の状態でクリックした場合は、bookmarkコレクションから削除し、
                  グレー表示にする */}
               {bookmarkflg ? 
               <Typography 
                sx={{ 
                  fontSize: 14 , 
                  color:"#ffa500"}}>
                <IconButton
                  onClick={handleBookMarkIcon}>
                  <Tooltip title="お気に入り登録する" arrow>
                    <StarsIcon sx={{ color : "#ffa500" ,fontSize: 20}}/>
                  </Tooltip>
                </IconButton>
                お気に入り：{bookmarkcount}件
              </Typography> : 
              <Typography 
                sx={{ 
                  fontSize: 14 , 
                  color:"#000000"}}>
                <IconButton
                  onClick={handleBookMarkIcon}>
                  <Tooltip title="お気に入り登録する" arrow>
                    <StarsIcon sx={{ color : "#696969" ,fontSize: 20}}/>
                  </Tooltip>
                </IconButton>
                お気に入り：{bookmarkcount}件
              </Typography>}
            </Grid>
          </Grid>
        </Box>
        {goodadd && <Alert severity="success">この投稿にいいね！しました。</Alert>}
        {goodcansel && <Alert severity="error">この投稿のいいね！を取り消しました。</Alert>}
        {bookmarkadd && <Alert severity="success">お気に入りに登録しました。</Alert>}
        {bookmarkcansel && <Alert severity="error">お気に入り登録を取り消しました。</Alert>}
        <br/>
        {/* メッセージ表示領域 */}

          <Grid container spacing={0}>
            <Typography
              sx={{ 
                p: 1, 
                fontSize: 20 , 
                color:"#000000"}}>
              <strong>コメント：</strong> 
            </Typography>
            <Typography
              sx={{ 
                p: 1, 
                fontSize: 20 , 
                color:"#E64545"}}>
              <strong>{commentcount}</strong>
            </Typography>
            <Typography
              sx={{ 
                p: 1, 
                fontSize: 20 , 
                color:"#000000"}}>
              <strong>件</strong>
            </Typography>
          </Grid>
          <Box
          sx={{
            bgcolor: '#eeeeee',
            pb : 4,
            pl : 4,
            pr : 4,}}>
          <Grid container spacing={0} >
            {/* メッセージ入力&送信ボタン表示 */}
            <Grid item xs={12} align = "center">
              {/* メッセージ内容の表示 */}
              <Message/>
              {/* メッセージ送信領域の表示 */}
              {/* <MessageInput/> */}
            </Grid>
          </Grid>
        </Box>
        <br/>
        {/* 作成者がログインユーザーの場合は編集ボタンを表示する */}
        <Grid container spacing={0} >
          <Grid item xs={12} align = "right">
            {/* 編集ボタンの表示 */}
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
        {/* フッターの表示 */}
      <Footer/>
    </ThemeProvider>
  );
}