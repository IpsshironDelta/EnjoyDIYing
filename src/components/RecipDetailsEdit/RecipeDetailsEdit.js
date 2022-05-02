import   React, 
       { useEffect ,
         useState }              from "react"
import { Alert ,
         Avatar,
         Button,
         Box,
         Grid,
         Typography,
         Container,
         CssBaseline,
         TextField,
         FormControl , 
         InputLabel, 
         Select,
         MenuItem,}              from "@mui/material"
import { createTheme, 
         ThemeProvider }         from '@mui/material/styles';
import { addDoc,
         collection,
         Timestamp,
         getDocs , }             from "firebase/firestore"         
import   RecipeDetailsEditHeader from "./RecipeDetailsEditHeader"
import   RecipeDetailsEditButton from "./RecipeDetailsEditButton";
import   Footer                  from '../Footer';
import   CardMedia               from '@mui/material/CardMedia';
import   useProfile              from "../hooks/useProfile"
import { firebaseApp }           from "../../firebase";
import { useHistory }            from 'react-router';
import   store                   from '../../store/index';
import { db }                    from '../../firebase';
import { format }                from "date-fns"

const collectionRecipeName = "recipe"
const collectionUserName   = "users"
const collectionName       = "category"
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

export default function RecipeDetailsEdit() {
  const [title , setTilte]         = useState(store.getState().recipetitle)      // 作品タイトルを表示
  const [category , setCategory]   = useState(store.getState().recipetitle)      // 作品タイトルを表示
  const [comment , setComment]     = useState(store.getState().productionMemo)   // 作品コメントを表示
  const [cost , setCost]           = useState(store.getState().productionCost)   // 制作費用を表示
  const [period , setPeriod]       = useState(store.getState().productionPeriod) // 制作期間を表示
  const [createdat , setCreatedAt] = useState(store.getState().createdAt)        // 制作日時を表示    
  const [image , setImage]         = useState()                                  // 作品画像を表示
  const [error, setError]          = useState(false)                             // エラー判定
  const [success, setSuccess]      = useState(false)                             // 成功判定
  const [errormessage , setErrorMessage] = useState("")                          // エラーメッセージ
  const [getavatarurl , setGetAvatarURL] = useState("")
  const profileData = useProfile()
  const profile = profileData.profile
  const firestorage = firebaseApp.firestorage
  const history = useHistory()
  // ------【START】セレクトボックス用------
  const [detail, setDetail] = useState([]);
  const detailAry = [];

  // セレクトボックスの要素選択時
  const handleSelectChange = (event) => {
    setCategory(event.target.value)
  };

  // firestoreからカテゴリーの取得
  const fetchCategoryData = () => {
    getDocs(collection(db, collectionName)).then((querySnapshot)=>{
      // recipenumと遷移元のレシピNoを比較する
      querySnapshot.forEach((doc) => {
        detailAry.push(
          //...doc.data()
          doc.data().detail
      )
    })
    }).then(()=>{
      setDetail([...detailAry])
    })};

  useEffect(() => {
    fetchCategoryData()
  },[]);
  // ------【END】セレクトボックス用------
  
  // ------【START】画像選択用------
  const handleChange = (e) => {
    if (e.target.files !== null) {
      setImage(e.target.files[0])
    }
  }
  // ------【END】画像選択用------

  // 「更新」ボタンクリック
  const handleSubmit = (event) => {
    event.preventDefault()
    // アラートが出ている場合は一旦消す
    setError(false)
    setSuccess(false)
    // 入力内容が空の場合はエラーを返す
    if(title === ""){
      console.log("作品タイトルが未入力")
      setErrorMessage("作品タイトルを入力してください")
      setError(true)
      return
    }
    if(comment === ""){
      console.log("作品コメントが未入力")
      setErrorMessage("作品コメントを入力してください")
      setError(true)
      return
    }
    if(category === ""){
      console.log("作品カテゴリーが未入力")
      setErrorMessage("作品カテゴリーを選択してください")
      setError(true)
      return
    }
    if(cost === ""){
      console.log("かかった費用が未入力")
      setErrorMessage("かかった費用を入力してください")
      setError(true)
      return
    }
    if(period === ""){
      console.log("所要時間が未入力")
      setErrorMessage("所要時間を入力してください")
      setError(true)
      return
    }
    setSuccess(true)
  }

  // pathnameから作品Noを取得
  var recipenumAry = window.location.pathname.split("/")
  const getrecipenum = recipenumAry[2]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecipeDetailsEditHeader/>
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
                fontSize: 20 , 
                width : 600 , 
                color:"#a0522d"}}>
              作品タイトル
            </Typography>
            <TextField 
              fullWidth
              id           = "name"
              name         = "name"
              variant      = "outlined"
              label        = "タイトルを入力してください"
              defaultValue = {title}
              value        = {title ?  title : ""}
              onChange     = {e => setTilte(e.target.value)}
              sx={{ 
                fontSize: 32 , 
                background: "#faf0e6", 
                borderRadius: 1 ,
                color:"#a0522d"}}/>
            <Box
              sx={{
                pt : 1,
                pl : 4,
                pr : 4,}}>
              <Grid container spacing={4}>
                <Grid item xs={1}>
                  {/* 作成したユーザーのアバター画像表示 */}
                  <Avatar src={store.getState().photoURL} alt="" />
                </Grid>
                <Grid item xs={5}>
                  {/* 作成したユーザー名を表示 */}
                  <Typography 
                    sx={{ 
                      p: 1, 
                      fontSize: 14 , 
                      width : 600 , 
                      color:"#000000"}}>
                    {store.getState().displayName}
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
                    投稿した日時：{format(createdat.toDate(), "yyyy年MM月dd日")}
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
                {/* 作品画像を表示 */}
                <CardMedia
                  component = "img"
                  height    = "250"
                  image     = {image ? URL.createObjectURL(image) : profile ? store.getState().recipeimage : ""}
                  alt       = ""/>
              </Typography>
              {/* 画像選択のボタン */}
              <Box component="form"  noValidate sx={{ mt: 4 }}>
                <Container align = "center">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    style={{ display: "none" }}/>
                  <label htmlFor="image">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      component="span"
                      sx = {{width : 200}}>
                      画像を選択
                    </Button>
                  </label>
                </Container>
              </Box>
              {/* 作品画像テスト用 */}
            </Grid>
            <Grid item xs={8}>
              {/* 作品コメント表示欄 */}
              <Grid>
                <Typography 
                  sx={{ 
                    pb       :  1,
                    fontSize : 14 , 
                    color    : "#a0522d"}}>
                  作品のコメント
                </Typography>
              </Grid>
              <Grid>
                <TextField 
                  fullWidth
                  multiline
                  id           = "name"
                  name         = "name"
                  variant      = "outlined"
                  label        = "コメントを入力してください"
                  defaultValue = {comment}
                  value        = {comment ? comment : ""}
                  onChange     = {e => setComment(e.target.value)}
                  sx={{ 
                    fontSize: 32 , 
                    background: "#ffffff", 
                    borderRadius: 1 ,
                    color:"#a0522d"}}/>
              </Grid>
              <br/>
              {/* 制作費用の表示 */}
              <Grid>
                <Typography 
                  sx={{ 
                    pb       :  1,
                    fontSize : 14 , 
                    color    : "#a0522d"}}>
                  作品カテゴリー
                </Typography>
              </Grid>
              <Grid>
                {/* セレクトボックステスト用 */}
                <FormControl fullWidth >
                  <InputLabel id="location-label">
                    カテゴリーを選択してください
                  </InputLabel>
                  {/* カテゴリー選択のセレクトボックス */}
                  <Select
                    labelId      = "demo-multiple-name-label"
                    id           = "demo-multiple-name"
                    defaultValue = {category}
                    value        = {category ? category : ""}
                    onChange     = {handleSelectChange}
                    label        = "カテゴリーを選択してください"
                    sx={{ 
                      background: "#ffffff", 
                      borderRadius: 1 ,
                      
                      }}>
                    {detail.map((category) => (
                      <MenuItem
                        key   = {category}
                        value = {category ? category : ""}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* セレクトボックステスト用 */}
              </Grid>
              <br/>
              {/* 制作費用の表示 */}
              <Grid>
                <Typography 
                  sx={{ 
                    pb       :  1,
                    fontSize : 14 , 
                    color    : "#a0522d"}}>
                  かかった費用
                </Typography>
              </Grid>
              <Grid>
                <TextField 
                  fullWidth
                  id           = "name"
                  name         = "name"
                  variant      = "outlined"
                  label        = "費用を入力してください"
                  defaultValue = {cost}
                  value        = {cost ? cost : ""}
                  onChange     = {e => setCost(e.target.value)}
                  sx={{ 
                    fontSize: 32 , 
                    background: "#ffffff", 
                    borderRadius: 1 ,
                    color:"#a0522d"}}/>
              </Grid>
              <br/>
              {/* 制作期間の表示 */}
              <Grid>
                <Typography 
                  sx={{ 
                    pb       :  1,
                    fontSize : 14 , 
                    color    : "#a0522d"}}>
                  所要時間
                </Typography>
              </Grid>
              <Grid>
                <TextField 
                  fullWidth
                  id           = "name"
                  name         = "name"
                  variant      = "outlined"
                  label        = "所要時間を入力してください"
                  defaultValue = {period}
                  value        = {period ? period : ""}
                  onChange     = {e => setPeriod(e.target.value)}
                  sx={{ 
                    fontSize: 32 , 
                    background: "#ffffff", 
                    borderRadius: 1 ,
                    color:"#a0522d"}}/>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <br/>
        {error && <Alert severity="error">{errormessage}</Alert>}
        {success && (<Alert severity="success"> すべて入力してあります。成功です！</Alert>)}
          <Grid container spacing={0} >
            <Grid item xs={4} align = "center">
              {/* 戻るボタンの表示 */}
              <RecipeDetailsEditButton 
                variant = "outlined"
                text    = "戻る"
                link    = {`/recipedetails/${getrecipenum}`}
                sx = {{width : 200}}/>
            </Grid>
            <Grid item xs={4} align = "center">
              {/* 削除ボタンの表示 */}
              <RecipeDetailsEditButton 
                variant = "outlined"
                text    = "この投稿を削除する"
                sx = {{width : 200}}/>
            </Grid>
            <Grid item xs={4} align = "center">
              {/* 編集完了ボタンの表示 */}
              <Button 
                variant = "contained"
                sx = {{width : 200}}
                onClick = {handleSubmit}>
                  更新する
                </Button>
            </Grid>
          </Grid>
        <br/>
        </Container>
      </Box>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}