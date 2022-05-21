import   React, 
      {  useEffect,
         useState }       from "react"
import { Avatar,
         Paper,
         Typography,
         CssBaseline,
         Box,
         TextField,
         Button,
         Container,
         Tabs ,
         Tab , }           from "@mui/material"
import { useHistory}       from 'react-router';
import { createTheme, 
         ThemeProvider }   from '@mui/material/styles';
import   useProfile        from "../hooks/useProfile"
import   store             from '../../store/index';
import   ProfilesImageList from "./ProfilesImageList"
import   BookmarkImageList from "./BookmarkImageList"
import   GoodImageList     from "./GoodImageList"
import   ProfilesHeader    from "./ProfilesHeader"
import { db }              from '../../firebase';
import { collection,
         getDocs ,}        from 'firebase/firestore';
import Footer            from '../Footer';

const collectionName = "users"

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

// タブパネルの関数
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profiles = () => {
  const [name, setName] = useState("")
  const [location , setLocation] = useState("")
  const [userinfo, setUserInfo] = useState([]);
  const [selfintroduction , setSelfIntroduction] = useState("")
  const [image, setImage] = useState()
  const profileData = useProfile()
  const profile = profileData.profile
  const history = useHistory()
  const userDataAry = [];

  // pathnameからuidを取得
  const uidAry = window.location.pathname.split("/")
  const getuid = uidAry[2]

  const handleSubmit = (event) => {
    store.getState().displayName = profile.name
    store.getState().location    = profile.location
    store.getState().memo        = profile.selfintroduction
    history.push("/profile/edit")
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // firestoreからユーザー情報の取得
  const fetchUsersData = () => {
    getDocs(collection(db, collectionName)).then((querySnapshot)=>{
      // recipenumと遷移元のレシピNoを比較する
      querySnapshot.forEach((doc) => {
          // 備忘録：文字列を比較する際、見た目は一緒なのになぜか一致しない現象が起きた。
          // ただし、文字列同士をString()で処理すると問題解決
          if(String(doc.data().uid) === String(getuid)){
            userDataAry.push({
              id : doc.id,
              ...doc.data()
          })
        }
      })
    }).then(()=>{
      setUserInfo([...userDataAry])
    })}

  useEffect(() => {
    fetchUsersData()
  },[])

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth>
            <ProfilesHeader/>
        </Container>
        {userinfo ? ( 
          userinfo.map((userinfo) => (
        <Container maxWidth="sm">
          <CssBaseline />
          {/* タブの文言 */}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="プロフィール情報" {...a11yProps(0)} />
                <Tab label="投稿した作品" {...a11yProps(1)} />
                {/* お気に入りタブはログイン中のユーザーのみ表示する */}
                {profile && profile.uid === getuid ? 
                  <Tab label="お気に入り" {...a11yProps(2)} />
                 : ""}
                {/* いいねタブはログイン中のユーザーのみ表示する */}
                {profile && profile.uid === getuid ? 
                  <Tab label="いいね" {...a11yProps(3)} />
                 : ""}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {/* プロフィールタブの中身表示 */}
              <Paper sx={{ m: 1, p: 1 }}>
                {/* ユーザー名表示 */}
                  <Typography align="center" variant="h5" >
                    {name ? name : userinfo ? userinfo.name : ""} さん<br/>
                    のプロフィール</Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                  <Container align = "center">
                    {/* アバター画像表示 */}
                      <Avatar
                        sx={{ width: 100, height: 100 }}
                        src={image ? URL.createObjectURL(image) : userinfo ? userinfo.image : ""}alt=""/>
                    <input
                        id     = "image"
                        type   = "file"
                        accept = "image/*"
                        style  = {{ display: "none" }}/>
                  </Container>
                      <Container align="left">
                        <Typography
                          sx = {{backgroundColor : "#ffffff",
                                 color : "#000000",
                                 padding: "0.2rem",
                                 borderLeft : "solid #E64545 6px"}}>
                          <strong>ユーザー名</strong>
                        </Typography>
                        {/* ユーザー名表示 */}
                        <Typography
                          sx = {{pt : 2 , pl : 2 ,}}>
                            {name ? name : userinfo ? userinfo.name : ""}
                        </Typography>
                      </Container>
                      <br/>
                      <Container align="left">
                      <Typography
                        sx = {{backgroundColor : "#ffffff",
                               color : "#000000",
                               padding: "0.2rem",
                               borderLeft : "solid #E64545 6px"}}>
                        <strong>所在地</strong>
                      </Typography>
                        {/* 所在地表示 */}
                          <Typography
                            sx = {{pt : 2 , pl : 2 ,}}>
                              {location ? location : userinfo ? userinfo.location : ""}
                          </Typography>
                        </Container>
                        <br/>
                        <Container align="left">
                          <Typography
                            sx = {{backgroundColor : "#ffffff",
                                   color : "#000000",
                                   padding: "0.2rem",
                                   borderLeft : "solid #E64545 6px"}}>
                            <strong>自己紹介</strong>
                          </Typography>
                          {/* 自己紹介の表示 */}
                          <Typography
                            sx = {{pt : 2 , pl : 2 ,}}>
                              {selfintroduction ? selfintroduction : userinfo ? userinfo.selfintroduction : "よろしくお願いします。"}
                          </Typography>
                        </Container>
                        {/* 編集ボタンはログイン中のユーザーのみ表示 */}
                      {profile && profile.uid === getuid ? 
                      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        プロフィールを編集する
                      </Button> : ""}
                  </Box>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* 投稿した作品の中身表示 */}
              <Paper sx={{ m: 0, p: 0 }}>
                <Typography align="center" variant="h5">
                  {name ? name : userinfo ? userinfo.name : ""} さん<br/>
                  の投稿した作品
                </Typography>
                <ProfilesImageList/>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={2}>
              {/* お気に入りの中身表示 */}
              <Paper sx={{ m: 1, p: 1 }}>
                  <Typography align="center" variant="h5">
                  {name ? name : profile ? profile.name : ""} さん<br/>
                    がお気に入りした作品</Typography>
                    <BookmarkImageList/>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={3}>
              {/* お気に入りの中身表示 */}
              <Paper sx={{ m: 1, p: 1 }}>
                  <Typography align="center" variant="h5">
                  {name ? name : profile ? profile.name : ""} さん<br/>
                    がいいねした作品</Typography>
                    <GoodImageList/>
              </Paper>
            </TabPanel>
          </Box>
        </Container>
        ))) : (
          <p>投稿が存在しません</p>)}
      <Footer/>
    </ThemeProvider>
  )
}

export default Profiles