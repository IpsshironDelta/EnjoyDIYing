import   React, 
      {  useEffect , 
         useState }      from "react"
import { Alert , 
         Avatar ,
         Typography ,
         Paper ,  
         Box ,
         Grid,
         Container ,
         createTheme , 
         ThemeProvider ,
         CssBaseline ,
         TextField , 
         Input,
         Button, 
         FormControl,
         InputLabel,
         Select ,
         MenuItem ,
         CardMedia,}      from "@mui/material"
import { firebaseApp }    from "../../firebase"
import   useUser          from "../hooks/getuseAuth"
import   PostPageHeader   from './PostPageHeader';
import   PostPageButton   from './PostPageButton';
import { styled }         from '@mui/material/styles';
import   EditIcon         from '@mui/icons-material/Edit';
import   ArrowBackIcon    from '@mui/icons-material/ArrowBack';
import   store            from '../../store/index';
import   useProfile       from "../hooks/useProfile"
import { useHistory}      from "react-router-dom";
import { ref,
         uploadBytes,
         getDownloadURL,} from "firebase/storage"
import { addDoc,
         collection,
         Timestamp,
         getDocs , }      from "firebase/firestore"
import { db }             from '../../firebase';
import Footer            from '../Footer';

const collectionCategoryName = "category"

const defaultSrc =
    "https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/PAGE_USE_IMG%2FAddImage.png?alt=media&token=d4acd7c6-5a2b-4f54-a4bb-0e6240d25f81";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

export default function PostPage() {
  const [name, setName] 
    = useState(store.getState().displayName)      // プロフィール名
  const [recipetitle, setRecipeTitle] 
    = useState("")      // 作品タイトル
  const [productioncost , setProductionCost] 
    = useState("")   // 制作費用
  const [productionperiod , setProductionPeriod] 
    = useState("") // 制作期間
  const [productionmemo , setProductionMemo] 
    = useState("")   // 作品メモ
  const [error, setError] = useState(false)             // エラー判定
  const [errormessage , setErrorMessage] = useState("") // エラーメッセージ
  const [success, setSuccess] = useState(false)         // 成功判定
  const [image, setImage] = useState()
  const firestorage = firebaseApp.firestorage
  const profileData = useProfile()
  const profile = profileData.profile
  const { user } = useUser()
  const history = useHistory()

  // ------セレクトボックス用------
  const [categorys, setCategorys] = useState([])
  const [detail, setDetail] = useState([])
  const categoryAry = []
  const detailAry = []
  const [selectcategory , setSelectCategory] = useState("")  // 大項目カテゴリー
  const [selectdetail , setSelectDetail]     = useState("")  // 小項目カテゴリー

  // categoryセレクトボックスの要素選択時
  const handleSelectChange = (event) => {
    setSelectCategory(event.target.value)
    setSelectDetail("")
    fetchDetailData(event.target.value)
  }

  // detailセレクトボックスの要素選択時
  const handleDetailChange = (event) => {
    setSelectDetail(event.target.value)
    console.log(event.target.value)
  };

  // firestoreからcategoryの取得
  const fetchCategoryData = () => {
    getDocs(collection(db, collectionCategoryName)).then((querySnapshot)=>{
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
      setCategorys([...categoryAry])
      console.log("categoryAry : " , categoryAry)
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
      console.log("detailAry : " , detailAry)
    })};
      
    useEffect(() => {
      fetchCategoryData()
    },[]);
  // ------セレクトボックス用------

  const handleChange = (e) => {
    console.log(e.target.files)
    if (e.target.files !== null) {
        setImage(e.target.files[0])
        console.log("handleChange ~> ",e.target.files[0])
        console.log("image.name => " , image)
      }
  }

  // 投稿ボタンがクリックされた時の処理
  const handleSubmit = (event) => {
    event.preventDefault()
    const firestore = firebaseApp.firestore
    // アラートが出ている場合は一旦消す
    setError(false)
    setSuccess(false)

    // 入力内容が空の場合はエラーを返す
    if(recipetitle ===""){
      console.log("作品タイトルが未入力")
      setErrorMessage("作品タイトルを入力してください")
      setError(true)
      return
    }
    if(selectcategory ===""){
      console.log("大項目が未入力")
      setErrorMessage("大項目を選択してください")
      setError(true)
      return
    }
    if(selectdetail ===""){
      console.log("小項目が未入力")
      setErrorMessage("小項目を選択してください")
      setError(true)
      return
    }
    if(productioncost ===""){
      console.log("制作費用が未入力")
      setErrorMessage("制作費用を入力してください")
      setError(true)
      return
    }
    if(productionperiod ===""){
      console.log("制作期間が未入力")
      setErrorMessage("制作期間を入力してください")
      setError(true)
      return
    }
    if(productionmemo ===""){
      console.log("作品コメントが未入力")
      setErrorMessage("作品コメントを入力してください")
      setError(true)
      return
    }
    if(!image){
      console.log("画像が選択していない")
      setErrorMessage("画像が選択されていません")
      setError(true)
      return
    }

    try {
      const docRef = collection(firestore, "recipe");

      if(image){
          const recipeNo = Math.floor(Math.random()* 1000000000000001)
          const imageRef = ref(firestorage, '/RECIPE_IMG/' + recipeNo + "/" + image.name)
          // firebase strageへ画像をアップロード
          uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then(url => {
              console.log(url)
              // firestoreへ投稿情報を書き込み
              addDoc(docRef,{
                category         : selectcategory,                 // 大項目カテゴリを入力
                detail           : selectdetail,                 // 小項目カテゴリを入力
                createdAt        : Timestamp.fromDate(new Date()), // 投稿日
                memo             : productionmemo ,                // 作品メモを入力
                cost             : productioncost ,                // 制作費用を入力
                period           : productionperiod ,              // 制作期間を入力
                title            : recipetitle ,                   // 作品タイトルを入力
                recipenum        : recipeNo ,                      // レシピNoを入力
                image: {
                  filename       : image.name,                     // ファイル名
                  user           : profile.name,                   // DIY作成者を入力
                  url            : url,                            // 画像のURLを入力
                  uid            : profile.uid,},                  // 作成者のUIDを入力
                })
              })
            console.log("画像アップロード完了!")
            // 成功したアラート表示
            setSuccess(true)
            setTimeout(() => {
              history.push("/")
            },2000)
          })
        }
          } catch (err) {
            console.log("エラーしてます")
            console.log(err)
            // 失敗したアラート表示
            setError(true)
          }
        }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth>
        <PostPageHeader />
      </Container>
      <Container maxWidth = "md">
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography 
              component="h1" 
              variant="h4" 
              align="center"
              sx = {{backgroundColor : "#ffffff",
                     color : "#000000",
                     padding: "1rem 2rem",
                     borderTop: "double #E64545 6px",
                     borderBottom: "double #E64545 6px",
                     pt : 2 , 
                     pb : 2 ,}}>
              DIY作品を投稿する
            </Typography>
            <br/>
            <Typography 
              component="h1" 
              variant="h6" 
              align="left"
              sx = {{backgroundColor : "#ffffff",
                     color : "#000000",
                     padding: "0.2rem",
                     borderLeft : "solid #E64545 6px"}}>
              画像選択
            </Typography>
            <Grid container spacing={1} align= "center">
                {/* <Item>タイトル画像<ImageUpload/></Item> */}
                <Grid item xs={12} md={12}>
                  <CardMedia
                    sx={{ width: 400, height: 400 }}
                    // src={image ? URL.createObjectURL(image) : profile ? profile.image : ""}alt=""/>
                    image={image ? URL.createObjectURL(image) : defaultSrc}alt=""/>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    style={{ display: "none" }}/>
                    <label htmlFor="image">
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        component="span"
                        sx = {{width : 400}}>
                        画像を選択する
                      </Button>
                    </label>
                </Grid>
                {/* <Item>画像2<ImageUpload/></Item>
                <Item>画像3<ImageUpload/></Item> */}
            </Grid>
            <br/>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx = {{backgroundColor : "#ffffff",
                         color : "#000000",
                         padding: "0.2rem",
                         borderLeft : "solid #E64545 6px"}}>
                  作品タイトル
                </Typography>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: '100%',}}>
                  <TextField
                    fullWidth
                    id           = "recipetitle"
                    name         = "recipetitle"
                    label        = "入力してください"
                    defaultValue = ""
                    onChange={e => 
                      setRecipeTitle(e.target.value)}/>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx = {{backgroundColor : "#ffffff",
                         color : "#000000",
                         padding: "0.2rem",
                         borderLeft : "solid #E64545 6px"}}>
                  カテゴリー：大項目
                </Typography>
                <FormControl fullWidth >
                  <InputLabel id="category-label">
                    選択してください
                  </InputLabel>
                  {/* カテゴリー選択のセレクトボックス */}
                  <Select
                    labelId  = "category-name-label"
                    id       = "category-name"
                    value    = {selectcategory}
                    onChange = {handleSelectChange}
                    label    = "選択してください">
                    {categorys.map((categorys) => (
                      <MenuItem
                        key   = {categorys}
                        value = {categorys}>
                        {categorys}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx = {{backgroundColor : "#ffffff",
                         color : "#000000",
                         padding: "0.2rem",
                         borderLeft : "solid #E64545 6px"}}>
                  カテゴリー：小項目
                </Typography>
                <FormControl fullWidth >
                  <InputLabel id="detail-label">
                    選択してください
                  </InputLabel>
                  {/* カテゴリー選択のセレクトボックス */}
                  <Select
                    labelId  = "detail-name-label"
                    id       = "detail-name"
                    value    = {selectdetail}
                    onChange = {handleDetailChange}
                    label    = "選択してください">
                    {detail.map((detail) => (
                      <MenuItem
                        key   = {detail}
                        value = {detail}>
                        {detail}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx = {{backgroundColor : "#ffffff",
                         color : "#000000",
                         padding: "0.2rem",
                         borderLeft : "solid #E64545 6px"}}>
                  制作費用
                </Typography>
                <Typography variant="h7">
                  ￥：
                  <TextField
                    id           = "productionCost"
                    name         = "productionCost"
                    size         = "small"
                    type         = "number"
                    label        = "入力してください"
                    defaultValue = ""
                    onChange={e => 
                      setProductionCost(e.target.value)}/>
                  円
                </Typography>
              </Grid>
                <br/><br/>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx = {{backgroundColor : "#ffffff",
                         color : "#000000",
                         padding: "0.2rem",
                         borderLeft : "solid #E64545 6px"}}>
                  制作期間
                </Typography>
                <Typography variant="h7">
                  約 ： 
                  <TextField
                    id           = "productionPeriod"
                    name         = "productionPeriod"
                    size         = "small"
                    label        = "入力してください"
                    defaultValue = ""
                    onChange={e => 
                      setProductionPeriod(e.target.value)}/>
                </Typography>
              </Grid>

              <Grid item xs={12} md={12}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx = {{backgroundColor : "#ffffff",
                         color : "#000000",
                         padding: "0.2rem",
                         borderLeft : "solid #E64545 6px"}}>
                  作品コメント
                </Typography>
                <TextField
                  fullWidth
                    id       = "memo"
                    label    = "入力してください"
                    name     = "memo"
                    multiline
                    rows={6}
                    defaultValue = ""
                    onChange={e => 
                      setProductionMemo(e.target.value)}/>
              </Grid>
            </Grid>
            {/* 画像選択の表示領域 */}
            {/* <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 10 }}>
              //  <Item>タイトル画像<ImageUpload/></Item> 
                <Grid item xs={12} md={12}>
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    // src={image ? URL.createObjectURL(image) : profile ? profile.image : ""}alt=""/>
                    src={image ? URL.createObjectURL(image) : defaultSrc}alt=""/>
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
                        component="span">
                        画像を選択
                      </Button>
                    </label>
                </Grid>
                // <Item>画像2<ImageUpload/></Item>
                // <Item>画像3<ImageUpload/></Item> 
                </Stack> */}

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                <Container align="center">
                  <PostPageButton
                    id   = "postreturn"
                    variant = "outlined"
                    sx={{ mt: 1, mb: 2 }}
                    fullWidth
                    startIcon = {<ArrowBackIcon/>}
                    link ="/"
                    text = "戻る"/>
                  </Container>
                </Grid>
                <Grid item xs={6}>
                  <Container align="center">
                    <Button
                      id   = "postok"
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      fullWidth
                      startIcon = {<EditIcon/>}
                      onClick = {handleSubmit}>
                        この内容で投稿する
                    </Button>
                  </Container>
                </Grid>
              </Grid>
            </Box>
            {/* 投稿が成功した場合はアラートを出す */}
            {success && <Alert severity="success">投稿完了しました！</Alert>}
            {/* 投稿が失敗した場合はアラートを出す */}
            {error && <Alert severity="error">{errormessage}</Alert>}
          </Paper>
        </Container>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
}