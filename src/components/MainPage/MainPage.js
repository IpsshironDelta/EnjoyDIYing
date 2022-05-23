import   React, 
       { useState,}          from "react"
import { Box ,
         Typography,
         Container , 
         Grid, 
         Button, 
         Tabs , 
         Tab ,
         Link, }             from '@mui/material'
import { createTheme,
         ThemeProvider }     from '@mui/material/styles'
import { useHistory,
         withRouter }        from 'react-router'
import   MainPageHeader      from './MainPageHeader'
import   MainPageImageList   from './MainPageImageList'
import   MainPageImageModule from './MainPageImageModule'
import   MainPageAccordion   from './MainPageAccordion'
import   MainPageSearchBox   from './MainPageSearchBox'
import   Footer              from '../Footer'
import   PersonIcon          from '@mui/icons-material/Person'
import   EditIcon            from '@mui/icons-material/Edit'
import { firebaseApp }       from "../../firebase"
import   useProfile          from "../../components/hooks/useProfile"
import { ref ,}              from "firebase/storage"
import { makeStyles }        from "@material-ui/core/styles"
import   PersonAddIcon       from '@mui/icons-material/PersonAdd'
import   ViewModuleIcon      from '@mui/icons-material/ViewModule'
import   ViewListIcon        from '@mui/icons-material/ViewList'

const useStyles = makeStyles({
  rectangle: {
    background:"#3D85CC",
    color : "#ffffff",
    width: "150px",
    height: "35px",
    "&:hover": {
      background: "#3D85CC"
    },
    "&:active": {
      background: "aqua"
    }
  }
})

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
})

const maipageImg = 
"https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/PAGE_USE_IMG%2F001_mainpage_img.png?alt=media&token=ec1c9756-3602-43a6-ad0e-ce4d23e3ca5f"
const subImg_001 = 
"https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/PAGE_USE_IMG%2F002_mainpage_img.jpg?alt=media&token=760a42db-f2e1-4e5a-a7f9-d485693e1e01"
const subImg_002 = 
"https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/PAGE_USE_IMG%2F004_mainpage_img.jpg?alt=media&token=af24a603-0191-42e2-8b13-dad349aa58a4"
const subImg_003 = 
"https://firebasestorage.googleapis.com/v0/b/myfirebasesample-c6d99.appspot.com/o/PAGE_USE_IMG%2F003_mainpage_img.jpg?alt=media&token=f824c05e-93c4-4bbe-9e10-0ac95f6d47af"
const filename       = "001_mainpage_img.png"
const filepath       = "gs://myfirebasesample-c6d99.appspot.com/PAGE_USE_IMG/"

// タブパネルの関数
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>)}
    </div>
  )
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MainPage(props) {
  // const buttonTheme = {
  //   background: "orange",
  //   color: "#ffffff"
  // };
  // const style = {
	// 	display: "flex",
	// 	flexDirection: "column",
	// 	alignItems: "center",
	// 	height: "100vh",
	// 	justifyContent: "center"
	// };
  // ユーザーが認証されていない場合、ログイン画面へ遷移する
  // firebaseApp.fireauth.onAuthStateChanged(user => {
  //   if (!user) {
  //     history.push("/login")
  //   }else{
  //     store.getState().loginUserUID = user.uid
  //   }
  // })

  const classes = useStyles()
  const history = useHistory()
  const profileData = useProfile()
  const profile = profileData.profile
  const [image, setImage] = useState()
  const firestorage = firebaseApp.firestorage
  const gsReference = ref(
    firestorage,
    filepath + filename
  )

  // タブ関連
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth>
        <MainPageHeader/>
      </Container>
      <Grid 
        container 
        spacing={0} 
        sx={{backgroundColor:'#E64545',height: '300px' , }}
        marginTop = '30px'>
        <Grid item xs={6}>
          <Typography variant="h4" align="center">
            <strong><br/>その "アイディア" を "カタチ" に</strong>
          </Typography>
          <Typography variant="h6" align="center">
            色、デザイン、工夫、アイディアetc...<br/>
            自由な発想、自由なアイディア、自由な工夫を探し出し、<br/>
            仲間が作った”これ、考えた人すごいね。”というような<br/>
            アイディアを共有してDIYを楽しみましょう。<br/><br/>
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} align = "right">
              <Button
                startIcon = {<EditIcon/>}
                sx = {{background:"#1D7BED" ,
                       padding : 1,
                       borderRadius : 10,
                       borderWidth : 1,
                       overflow : "hedden",
                       color:"#ffffff",
                       width: "150px",
                       height: "35px",
                       "&:hover": {
                         background: "#1D7BED"},}}
                  onClick = {() => {
                    {profile ? history.push("/postpage")
                  : history.push("/signup")}}}>
                  投稿する
              </Button>
            </Grid>
            <Grid item xs={6} align = "left">
            {profile ? 
              <Button
                startIcon = {<PersonIcon/>}
                sx = {{background:"#1D7BED" ,
                       padding : 1,
                       borderRadius : 10,
                       borderWidth : 1,
                       color:"#ffffff",
                       width: "150px",
                       height: "35px",
                       "&:hover": {background: "#1D7BED"},}}
                onClick = {() => {
                  history.push("/profiles/"+profile.uid)}}>
                  マイページ
              </Button>
              : <Button
              startIcon = {<PersonAddIcon/>}
              sx = {{background:"#1D7BED" ,
                      padding : 1,
                      borderRadius : 10,
                      borderWidth : 1,
                      color:"#ffffff",
                      width: "150px",
                      height: "35px",
                      "&:hover": {
                        background: "#1D7BED"
                      },}}
                onClick = {() => {
                  history.push("/signup")}}>
                新規登録する
              </Button> }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" align='center'>
            <img 
              src     = {maipageImg}
              width   = "350px" 
              alt     = "preview"
              padding = "1em"/>
          </Typography>
        </Grid>
      </Grid>
        
      <Box sx={{ flexGrow: 1, m: 2, pt: 4, pb: 4 }}>
        <Container maxWidth>
        <Grid container spacing={0} >
          <Grid item xs={12}>
            <Typography variant="h5" align="center" color="#000000">
              <strong>その "考え" を探しましょう！</strong>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="center" color="#ff3838">
              <strong><br/>1.アイディアの参考に</strong>
            </Typography>
            <Typography variant="body2" align='center'>
              <img 
                src     = {subImg_001}
                width   = "250px" 
                alt     = "preview"
                padding = "1em"/>
            </Typography>
            <Typography variant="body1" align="center" color="#000000">
              仲間が考えたアイディアを参考にして<br/>
              デザインの発案をお助けします。
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="center" color="#ff3838">
              <strong><br/>2.教えて！をカンタンに</strong>
            </Typography>
            <Typography variant="body2" align='center'>
              <img 
                src     = {subImg_002}
                width   = "400px" 
                alt     = "preview"
                padding = "1em"/>
            </Typography>
            <Typography variant="body1" align="center" color="#000000">
              DIY好きの仲間同士で知恵を出し合い<br/>
              問題解決をカンタンにします。
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="center" color="#ff3838">
              <strong><br/>3.DIY制作ツールに</strong>
            </Typography>
            <Typography variant="body2" align='center'>
              <img 
                src     = {subImg_003}
                width   = "250px" 
                alt     = "preview"
                padding = "1em"/>
            </Typography>
            <Typography variant="body1" align="center" color="#000000">
              自分だけのDIY作品ツールとして<br/>
              ご利用いただけます。<br/>
            </Typography>
          </Grid>
        </Grid>
        </Container>

        <Container maxWidth = "md" >
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,}}>
              {/* <Typography
              component="h1"
              variant="h5"
              align="left"
              color="text.primary"
              gutterBottom
              sx = {{backgroundColor : "#ffffff",
                     color : "#000000",
                     padding: "1rem 2rem",
                     borderTop: "double #E64545 6px",
                     borderBottom: "double #E64545 6px",
                     pt : 1 , 
                     pb : 1 ,}}>
              フリーワードでさがす
            </Typography>
            <br/>
            <MainPageSearchBox/> */}
            <br/>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              color="text.primary"
              gutterBottom
              sx = {{backgroundColor : "#ffffff",
                     color : "#000000",
                     padding: "1rem 2rem",
                     borderTop: "double #E64545 6px",
                     borderBottom: "double #E64545 6px",
                     pt : 1 , 
                     pb : 1 ,}}>
              <Link href={"/categorylist"} color="#000000">
                カテゴリー</Link>
                でさがす
            </Typography>
            <br/>
            <MainPageAccordion/>
            <br/>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              color="text.primary"
              gutterBottom
              sx = {{backgroundColor : "#ffffff",
                     color : "#000000",
                     padding: "1rem 2rem",
                     borderTop: "double #E64545 6px",
                     borderBottom: "double #E64545 6px",
                     pt : 1 , 
                     pb : 1 ,}}>
              みんなの作品をみる
            </Typography>
            {/* タブの文言 */}
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                  <Tab label={<ViewListIcon/>} {...a11yProps(0)} />
                  <Tab label={<ViewModuleIcon/>} {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <MainPageImageList/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <MainPageImageModule/>
              </TabPanel>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withRouter(MainPage);
