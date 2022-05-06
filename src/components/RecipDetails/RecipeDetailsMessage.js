import React, 
      { useEffect,
        useState,
        useRef ,}  from "react";
import { db }               from '../../firebase';
import { collection,
         deleteDoc,
         doc ,
         getDocs ,}         from 'firebase/firestore';
import { Avatar ,
         Typography , 
         Box ,
         Grid,
         Container ,
         createTheme , 
         ThemeProvider ,
         Tooltip ,
         CssBaseline ,
         IconButton , }     from "@mui/material"
import { format ,
         formatDistance,  } from "date-fns"
import { ja }               from "date-fns/locale"
import useProfile           from "../hooks/useProfile"
import { useHistory }       from "react-router-dom"
import DeleteIcon           from '@mui/icons-material/Delete';

const collectionName = "message"
const theme = createTheme({
  shadows: ["none"],
  palette: {
    // テキストのカラー設定
    text: { primary: '#000000' },
  },
})

function App() {
  // 追加
  const [message, setMessage] = useState([]);
  const profileData = useProfile()
  const profile = profileData.profile
  const array = [];
  const bottomRef = useRef(null)
  const history = useHistory();
  
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
  
  const fetchMessageData = () => {
    getDocs(collection(db, collectionName)).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        console.log(doc.id,doc.data())
        console.log(doc.data().text)
        console.log(format(doc.data().createdAt.toDate(), "yyyy年MM月dd日hh:mm"))
        array.push({
          id : doc.id,
          ...doc.data()
        })})
    }).then(()=>{
      setMessage([...array])
    })};

  useEffect(() => {
    fetchMessageData()
  },[]);

  // 削除ボタンクリック時
  const handleDelete = (id) => {
    console.log("id => ",id)
    if (window.confirm("削除してもよろしいですか？")) {
      console.log("OK を選択してます" , id)
      
      // ドキュメントのid（名前）を取得
      console.log("ドキュメントのid（名前）を取得")
      console.log("削除するID",id)
      deleteDoc(doc(db , collectionName , id)).then((doc) => {
        fetchMessageData()
        alert("削除しました。")
      })
      .catch(() => {
        alert("失敗しました")
     })
    }else{
      console.log("キャンセルを選択してます。")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, m: 2, }}>
        <Grid item xs={12}>
          {message ? (
            message.map((message) => (
              <Box 
                key={message.id} 
                sx={{
                  display: "flex",
                  flexDirection:profile && profile.uid === message.user.uid ? "row" : "row-reverse",
                  my: 2,
                  gap: 2,
                  flexGrow: 1, m: 2,}}>
                <Box>
                  <Avatar src={message.user.image ? message.user.image : ""} alt="" />
                </Box>
                <Box sx={{ ml: 0 }}>
                  <Typography 
                    sx={{ fontSize: 12 }}
                    align = {profile && profile.uid === message.user.uid ? "left" : "right"}>
                      {/* ユーザー名の表示 */}
                    {message.user.name}
                  </Typography>
                  <Typography 
                    sx={{ 
                      p: 1, 
                      background: "#dddddd", 
                      borderRadius: 1 ,
                      maxWidth : 400,
                      minWidth : 250,}}
                    align = {profile && profile.uid === message.user.uid ? "left" : "right"}>
                      {/* メッセージ内容の表示 */}
                      {message.text}
                  </Typography>
                  <Grid container spacing={0}>
                    <Grid item xs={8} align = "left">
                      <Typography sx={{ fontSize: 12 }}>
                        {/* メッセージの送信日時の表示 */}
                        {format(message.createdAt.toDate(), "yyyy年MM月dd日hh:mm")}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} align = "right">
                      <Typography sx={{ fontSize: 12 }}>
                        {/* メッセージ送信日時の履歴表示 */}
                        {time(message.createdAt)}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} align = "center">
                      {/* 削除ボタンの表示 */}
                      <IconButton 
                        onClick={() => handleDelete(message.id)}>
                        <Tooltip title="削除する" arrow>
                          <DeleteIcon sx={{ color : "#808080" ,fontSize: 16}}/>
                        </Tooltip>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))) : (
            <p>メッセージが存在しません</p>)}
            <div ref={bottomRef}></div>
          </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;