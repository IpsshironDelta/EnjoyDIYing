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
         doc,
         getDocs ,
         updateDoc,
         deleteDoc, }            from "firebase/firestore"
import { ref,
         uploadBytes,
         getDownloadURL,}        from "firebase/storage"
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

const collectionRecipeName   = "recipe"
const collectionUserName     = "users"
const collectionCategoryName = "category"
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
  const [title , setTilte]                   = useState(store.getState().recipetitle)      // 作品タイトルを表示
  const [memo , setMemo]                     = useState(store.getState().productionMemo)   // 作品コメントを表示
  const [cost , setCost]                     = useState(store.getState().productionCost)   // 制作費用を表示
  const [period , setPeriod]                 = useState(store.getState().productionPeriod) // 制作期間を表示
  const [createdat , setCreatedAt]           = useState(store.getState().createdAt)        // 制作日時を表示    
  const [image , setImage]                   = useState()                                  // 作品画像を表示
  const [imagename , setImageName]           = useState()                                  // 画像変更時のファイル名を表示
  const [error, setError]                    = useState(false)                             // エラー判定
  const [success, setSuccess]                = useState(false)                             // 成功判定
  const [errormessage , setErrorMessage]     = useState("")                                // エラーメッセージ
  const [getavatarurl , setGetAvatarURL]     = useState("")
  const profileData = useProfile()
  const profile = profileData.profile
  const firestorage = firebaseApp.firestorage
  const firestore = firebaseApp.firestore
  const history = useHistory()

  // pathnameから作品Noを取得
  var recipenumAry = window.location.pathname.split("/")
  const getrecipenum = recipenumAry[2]

  // ------【START】セレクトボックス用------
  const [category , setCategory]             = useState([])         // 作品カテゴリーを表示(category)
  const [detail , setDetail]                 = useState([])         // 作品カテゴリーを表示(detail)
  const categoryAry = [];
  const detailAry = [];
  const [selectcategory , setSelectCategory] = useState(store.getState().category)
  const [selectdetail , setSelectDetail]     = useState(store.getState().detail)

  // categoryセレクトボックスの要素選択時
  const handleSelectChange = (event) => {
    setSelectCategory(event.target.value)
    setSelectDetail("")
    console.log(event.target.value)
    fetchDetailData(event.target.value)
  }

  // detailセレクトボックスの要素選択時
  const handleDetailChange = (event) => {
    setSelectDetail(event.target.value)
    console.log(event.target.value)
  }

  // firestoreからcategoryの取得
  const fetchCategoryData = () => {
    getDocs(collection(db, collectionCategoryName)).then((querySnapshot)=>{
      // recipenumと遷移元のレシピNoを比較する
      querySnapshot.forEach((doc) => {
      // 重複していない要素だけを追加する
      if(!categoryAry.includes(doc.data().category)){
        // 「その他」は末尾に格納する
        if(doc.data().category !== "その他"){
          categoryAry.unshift(
            doc.data().category)
        }else{
          categoryAry.push(
            doc.data().category)
        }
      }
    })
  }).then(()=>{
    setCategory([...categoryAry])
  })}

  // firestoreからdetailの取得
  const fetchDetailData = (detail) => {
    console.log("detail => ", detail)
    getDocs(collection(db, collectionCategoryName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // カテゴリーで選択している要素だけを追加する
        if(doc.data().category === detail){
          // 「その他」は末尾に格納する
          if(doc.data().detail !== "その他"){
            detailAry.unshift(
              doc.data().detail)
          }else{
            detailAry.push(
              doc.data().detail)
          }
        }
      })
    }).then(()=>{
      setDetail([...detailAry])
    })};

  useEffect(() => {
    fetchCategoryData()
    fetchDetailData(store.getState().category)
  },[]);
  // ------【END】セレクトボックス用------
  
  // ------【START】画像選択用------
  const handleChange = (e) => {
    if (e.target.files !== null) {
      setImage(e.target.files[0])
      setImageName(e.target.files[0].name)
    }
  }
  // ------【END】画像選択用------

  // 「削除」ボタンクリック時
  const handleDelete = (id) => {
    console.log("id => " , id)
    if (window.confirm("削除してもよろしいですか？")) {
            // ドキュメントのid（名前）を取得
      deleteDoc(doc(db , collectionRecipeName , id)).then((doc) => {
        // fetchUsersData()
        alert("削除しました。")
        setTimeout(() => {
          history.push("/")
        },1000)
      })
      .catch(() => {
        alert("失敗しました")
     })
    }else{
    }
  }

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
    if(memo === ""){
      console.log("作品コメントが未入力")
      setErrorMessage("作品コメントを入力してください")
      setError(true)
      return
    }
    if(selectcategory === ""){
      console.log("大項目が未入力")
      setErrorMessage("大項目を選択してください")
      setError(true)
      return
    }
    if(selectdetail === ""){
      console.log("小項目が未入力")
      setErrorMessage("小項目を選択してください")
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
    try {
      // const uid = user.uid
      const docRef = collection(firestore, collectionRecipeName);
      if(image){
          const imageRef = ref(firestorage, '/RECIPE_IMG/' + getrecipenum + "/" + image.name)
          // firebase strageへ画像をアップロード
          uploadBytes(imageRef, image).then(() => {
              // getDownloadURLの中で、profileがある場合はupdateDocを指定
              // profileがない場合はaddDocを指定
              // imageがない場合も同様に指定
              getDownloadURL(imageRef).then(url => {
                if (profile) {
                  const redipeRef = doc(firestore, collectionRecipeName , store.getState().documentID)
                  updateDoc(redipeRef, {
                    title ,                     // 作品タイトルを入力
                    category : selectcategory , // category(大項目)を入力
                    detail : selectdetail ,     // detail(小項目)を入力
                    memo ,                      // 作品メモを入力
                    cost ,                      // 制作費用を入力
                    period ,                    // 制作期間を入力
                    image : {
                      filename : image.name ,   // image - ファイル名
                      url      : url ,
                      uid      : profile.uid,
                      user     : profile.name}, // image - 画像URLを入力
                  })
                }else{
                  // firestoreに名前、画像URL、uidを追加する
                  addDoc(docRef, {
                      title,
                      category : selectcategory,
                      detail   : selectdetail,
                      memo,
                      cost,
                      period,
                      image: {
                        filename : image.name,
                        url : url,},
                    })
                  }
              })
            })
          }else{
            // 画像を選択する
            if (profile) {
              const redipeRef = doc(firestore, collectionRecipeName, store.getState().documentID)
              updateDoc(redipeRef, 
                { title , 
                  category : selectcategory, 
                  detail   : selectdetail,
                  memo , 
                  cost , 
                  period})
            } else {
              addDoc(docRef, { 
                title, 
                category : selectcategory, 
                detail   : selectdetail,
                memo,
                cost , 
                period ,
                image : {
                  filename : "" , 
                  url : "" , },
              })
            }}
            console.log("画像アップロード完了!")
            // 成功したアラート表示
            setSuccess(true)
            setTimeout(() => {
              history.push("/")
            },2000)
        } catch (err) {
            console.log(err)
            // 失敗したアラート表示
            setError(true)
            setErrorMessage("更新できませんでした。")
        }
      }

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
                pt : 2 ,
                pb : 2 ,
                fontSize: 20 , 
                width : 600 , 
                color:"#a0522d",
                borderLeft : "solid #a0522d 6px"}}>
              <strong>作品タイトル</strong>
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
              {/* 制作費用の表示 */}
              <Grid>
                <Typography 
                  sx={{ 
                    pt       :  1,
                    pb       :  1,
                    pl       :  1,
                    fontSize : 14 , 
                    color    : "#a0522d",
                    borderLeft : "solid #a0522d 6px"}}>
                  <strong>作品カテゴリー</strong>
                </Typography>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  {/* categoryセレクトボックステスト用 */}
                  <FormControl fullWidth >
                    <InputLabel id="category-label">
                      大項目を選択してください
                    </InputLabel>
                    {/* category選択のセレクトボックス */}
                    <Select
                      labelId      = "category-name-label"
                      id           = "category-name"
                      defaultValue = {selectcategory}
                      value        = {selectcategory ? selectcategory : store.getState().category}
                      onChange     = {handleSelectChange}
                      label        = "カテゴリーを選択してください"
                      sx={{ 
                        background: "#ffffff", 
                        borderRadius: 1 ,
                        }}>
                      {category.map((category) => (
                        <MenuItem
                          key   = {category}
                          value = {category ? category : ""}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* category セレクトボックステスト用 */}
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* detailセレクトボックステスト用 */}
                  <FormControl fullWidth >
                    <InputLabel id="detail-label">
                      小項目を選択してください
                    </InputLabel>
                    {/* detail選択のセレクトボックス */}
                    <Select
                      labelId      = "detail-name-label"
                      id           = "detail-name"
                      defaultValue = {selectdetail}
                      value        = {selectdetail ? selectdetail : store.getState().detail}
                      onChange     = {handleDetailChange}
                      label        = "カテゴリーを選択してください"
                      sx={{ 
                        background: "#ffffff", 
                        borderRadius: 1 ,
                        
                        }}>
                      {detail.map((detail) => (
                        <MenuItem
                          key   = {detail}
                          value = {detail ? detail : ""}>
                          {detail}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* detail セレクトボックステスト用 */}
                </Grid>
              </Grid>
              <br/>
              {/* 制作費用の表示 */}
              <Grid>
                <Typography 
                  sx={{ 
                    pt       :  1,
                    pb       :  1,
                    pl       :  1,
                    fontSize : 14 , 
                    color    : "#a0522d",
                    borderLeft : "solid #a0522d 6px"}}>
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
                    pt       :  1,
                    pb       :  1,
                    pl       :  1,
                    fontSize : 14 , 
                    color    : "#a0522d",
                    borderLeft : "solid #a0522d 6px"}}>
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
          <br/>
          {/* 作品コメント表示欄 */}
          <Grid>
            <Typography 
              sx={{ 
                pt       :  1,
                pb       :  1,
                pl       :  1,
                fontSize : 14 , 
                color    : "#a0522d",
                borderLeft : "solid #a0522d 6px"}}>
              <strong>作品のコメント</strong>
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
              defaultValue = {memo}
              value        = {memo ? memo : ""}
              onChange     = {e => setMemo(e.target.value)}
              sx={{ 
                fontSize: 32 , 
                background: "#ffffff", 
                borderRadius: 1 ,
                color:"#a0522d"}}/>
          </Grid>
        </Box>
        <br/>
        {error && <Alert severity="error">{errormessage}</Alert>}
        {success && (<Alert severity="success"> 更新が完了しました！</Alert>)}
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
              <Button
                variant = "outlined"
                sx = {{width : 200}}
                onClick = {() => handleDelete(store.getState().documentID)}>
                  この投稿を削除する
              </Button>
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